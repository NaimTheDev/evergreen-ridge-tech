import { BreakdownLine, ContactPayload, EstimatePayload } from "./types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

// Bots that fill the hidden honeypot field are rejected without an error response,
// so they don't learn the field is a trap.
export const isHoneypotTripped = (body: { _gotcha?: unknown }) =>
  typeof body._gotcha === "string" && body._gotcha.trim().length > 0;

export function validateContactPayload(body: any): body is ContactPayload {
  return (
    isNonEmptyString(body?.name) &&
    isNonEmptyString(body?.email) &&
    EMAIL_RE.test(body.email) &&
    isNonEmptyString(body?.message)
  );
}

const isBreakdownArray = (value: unknown): value is BreakdownLine[] =>
  Array.isArray(value) &&
  value.every(
    (line) =>
      line &&
      isNonEmptyString(line.label) &&
      typeof line.hours === "number" &&
      typeof line.cost === "number"
  );

export function validateEstimatePayload(body: any): body is EstimatePayload {
  return (
    isNonEmptyString(body?.name) &&
    isNonEmptyString(body?.email) &&
    EMAIL_RE.test(body.email) &&
    isNonEmptyString(body?.project_type) &&
    isNonEmptyString(body?.complexity) &&
    isNonEmptyString(body?.timeline) &&
    isNonEmptyString(body?.budget) &&
    typeof body?.total_hours === "number" &&
    typeof body?.total_low === "number" &&
    typeof body?.total_high === "number" &&
    isBreakdownArray(body?.breakdown) &&
    isBreakdownArray(body?.bufferLines)
  );
}
