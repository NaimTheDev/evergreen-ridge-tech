import PQueue from "p-queue";
import { generateProposal } from "./generateProposal";
import { generateEstimatePdf } from "../pdf/generateEstimatePdf";
import { timed } from "../lib/log";
import { EstimatePayload, Proposal } from "../types";

/*
  Bounds OpenAI spend and PDF-render CPU together: both run inside the same
  queued task, so at most 2 submissions are doing this expensive work at once,
  regardless of how many are accepted (MAX_INFLIGHT in estimate.ts governs that
  separately, at the HTTP layer).
*/
const queue = new PQueue({ concurrency: 2 });

export interface ProposalPipelineResult {
  proposal: Proposal | null;
  pdfAttachment: { filename: string; content: string } | null;
}

async function runPipeline(
  payload: EstimatePayload,
  jobId: string
): Promise<ProposalPipelineResult> {
  const fields = { jobId };

  // A generation failure must not take the PDF (or the lead) down with it, so
  // it degrades to null rather than throwing out of the pipeline.
  let proposal: Proposal | null = null;
  try {
    proposal = await timed("ai.proposal", fields, () => generateProposal(payload));
  } catch {
    // Already logged by timed() as ai.proposal.fail.
  }

  // Cost estimation is already done client-side (calculateEstimate) and lives
  // in `payload` — no server-side recomputation needed, just carried through
  // into the render step below.

  let pdfAttachment: { filename: string; content: string } | null = null;
  try {
    const pdfBuffer = await timed("pdf.render", fields, () =>
      generateEstimatePdf(payload, proposal)
    );
    pdfAttachment = {
      filename: "evergreen-ridge-draft-estimate.pdf",
      content: pdfBuffer.toString("base64"),
    };
  } catch {
    // Already logged by timed() as pdf.render.fail.
  }

  return { proposal, pdfAttachment };
}

export function runProposalPipeline(
  payload: EstimatePayload,
  jobId: string
): Promise<ProposalPipelineResult> {
  return queue.add(() => runPipeline(payload, jobId));
}
