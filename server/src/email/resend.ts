import { CreateEmailOptions, Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  throw new Error("RESEND_API_KEY is not set");
}

export const resend = new Resend(apiKey);
export const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";
export const CONTACT_TO_EMAIL =
  process.env.CONTACT_TO_EMAIL || "naim@evergreenridgetech.com";

// The Resend SDK does not throw on API-level failures (bad key, unverified
// domain, etc.) — it resolves with { data: null, error }. Surface that as a
// thrown error so callers' try/catch actually catches send failures.
export async function sendMail(payload: CreateEmailOptions) {
  const { data, error } = await resend.emails.send(payload);
  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }
  return data;
}
