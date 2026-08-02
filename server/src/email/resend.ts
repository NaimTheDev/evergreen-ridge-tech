import { CreateEmailOptions, Resend } from "resend";
import { log } from "../lib/log";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  throw new Error("RESEND_API_KEY is not set");
}

export const resend = new Resend(apiKey);
export const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";
export const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL || "naim@evergreenridgetech.com";

export class ResendError extends Error {
  constructor(readonly code: string, message: string) {
    super(`Resend ${code}: ${message}`);
    this.name = "ResendError";
  }
}

export async function sendMail(
  payload: CreateEmailOptions,
  options?: { idempotencyKey?: string }
) {
  const { data, error } = await resend.emails.send(payload, options);
  if (error) {
    throw new ResendError(error.name, error.message);
  }
  return data;
}

const RETRYABLE_CODES = new Set([
  "rate_limit_exceeded",
  "application_error",
  "internal_server_error",
]);


const isRetryable = (err: unknown) =>
  err instanceof ResendError ? RETRYABLE_CODES.has(err.code) : true;

const SEND_TIMEOUT_MS = 15_000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error(`Resend send timed out after ${ms}ms`)), ms).unref();
    }),
  ]);
}

/*
  Bounded retry for background sends. Total stays well under the 20s shutdown
  drain budget. The idempotency key makes a retry safe in the case that actually
  matters: the request succeeded but we never saw the response.
*/
export async function sendWithRetry(
  payload: CreateEmailOptions,
  {
    idempotencyKey,
    jobId,
    attempts = 3,
  }: { idempotencyKey: string; jobId: string; attempts?: number }
) {
  let lastErr: unknown;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await withTimeout(sendMail(payload, { idempotencyKey }), SEND_TIMEOUT_MS);
    } catch (err) {
      lastErr = err;
      const retryable = isRetryable(err);
      const message = err instanceof Error ? err.message : String(err);

      if (!retryable || attempt === attempts) {
        log("warn", "email.giving_up", { jobId, attempt, retryable, err: message });
        throw err;
      }

      const backoff = Math.round(500 * 2 ** (attempt - 1) + Math.random() * 250);
      log("warn", "email.retrying", { jobId, attempt, inMs: backoff, err: message });
      await new Promise((r) => setTimeout(r, backoff));
    }
  }

  throw lastErr;
}
