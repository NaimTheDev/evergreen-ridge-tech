import OpenAI from "openai";
import { EstimatePayload, Proposal } from "../types";

const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";
const TIMEOUT_MS = 15_000;

let client: OpenAI | null = null;

function getClient(): OpenAI {
  if (client) return client;
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not set");
  }
  client = new OpenAI({ apiKey });
  return client;
}

const PROPOSAL_SCHEMA = {
  type: "object",
  properties: {
    overview: {
      type: "string",
      description: "2-3 sentences summarizing their project, referencing what they told us.",
    },
    approach: {
      type: "string",
      description: "A short paragraph on how we'd tackle it, referencing the selected features.",
    },
    investmentNote: {
      type: "string",
      description:
        "One confident paragraph stating the investment range exactly once, framed positively.",
    },
    nextSteps: {
      type: "string",
      description: "A short closing paragraph inviting them to talk to us next.",
    },
  },
  required: ["overview", "approach", "investmentNote", "nextSteps"],
  additionalProperties: false,
};

function buildPrompt(payload: EstimatePayload) {
  const features = payload.breakdown.map((f) => `- ${f.label} (~${f.hours} hrs)`).join("\n");

  return [
    `Project type: ${payload.project_type}`,
    `Complexity: ${payload.complexity}`,
    `Timeline: ${payload.timeline}`,
    `Self-selected budget tier: ${payload.budget}`,
    payload.notes ? `What they told us about the project:\n${payload.notes}` : null,
    `Selected features:\n${features}`,
    `Estimated investment range: $${payload.total_low.toLocaleString()} – $${payload.total_high.toLocaleString()} (~${payload.total_hours} hours)`,
  ]
    .filter(Boolean)
    .join("\n\n");
}

const SYSTEM_PROMPT =
  "You are a senior agency project manager and copywriter at Evergreen Ridge Technologies " +
  "writing a warm, confident client-facing project proposal — not a data dump. State the " +
  "investment range exactly once, in the investmentNote field, framed positively. Reference " +
  "the client's own project description where one is given. Keep each field concise.";

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error(`OpenAI call timed out after ${ms}ms`)), ms).unref();
    }),
  ]);
}

/*
  Throws on failure/timeout/malformed output rather than swallowing — the caller
  (proposalPipeline.ts) wraps this in timed() + try/catch, same degrade-to-null
  pattern estimate.ts already uses for PDF rendering, so failures still get logged.
*/
export async function generateProposal(payload: EstimatePayload): Promise<Proposal> {
  const completion = await withTimeout(
    getClient().chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildPrompt(payload) },
      ],
      response_format: {
        type: "json_schema",
        json_schema: { name: "proposal", schema: PROPOSAL_SCHEMA, strict: true },
      },
    }),
    TIMEOUT_MS
  );

  const content = completion.choices[0]?.message?.content;
  if (!content) throw new Error("OpenAI response had no content");

  return JSON.parse(content) as Proposal;
}
