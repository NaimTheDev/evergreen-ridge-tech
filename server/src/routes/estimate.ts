import { randomUUID } from "node:crypto";
import { Router } from "express";
import { sendWithRetry, FROM_EMAIL, CONTACT_TO_EMAIL } from "../email/resend";
import { buildEstimateLeadHtml, buildEstimateVisitorHtml } from "../email/templates";
import { runProposalPipeline } from "../ai/proposalPipeline";
import { log, maskEmail, timed } from "../lib/log";
import { pendingCount, runInBackground } from "../lib/jobs";
import { EstimatePayload } from "../types";
import { isHoneypotTripped, validateEstimatePayload } from "../validate";

export const estimateRouter = Router();

/*
  Unlike /api/contact, which confirms delivery before responding, this route
  answers 202 and finishes the work in the background. Rendering the PDF and
  sending two emails takes 5-10s on Render's free tier, and none of it is work
  the visitor needs to sit through. The tradeoff — we tell them "accepted"
  before we know it sent — is covered by the lead-first fallback below, which
  guarantees the lead email survives a PDF failure. Don't "fix" the asymmetry
  with contact.ts; it's deliberate.
*/

// The rate limiter (20 per 15min) used to double as a concurrency limiter,
// because a 5-10s handler self-throttled. At ~5ms it doesn't, so one client
// could queue 20 concurrent PDF renders on a fraction of a CPU.
const MAX_INFLIGHT = 3;

const PDF_FAILED_BANNER =
  `<p style="background:#FEF3C7;border-left:4px solid #D97706;padding:12px;font-weight:bold;">` +
  `PDF render failed for this lead — the full breakdown is inline below.</p>`;

async function processEstimate(body: EstimatePayload, jobId: string) {
  const fields = { jobId, email: maskEmail(body.email) };

  const { proposal, pdfAttachment } = await timed("proposal.pipeline", fields, () =>
    runProposalPipeline(body, jobId)
  );
  if (pdfAttachment) {
    log("info", "pdf.size", { ...fields, bytes: Buffer.byteLength(pdfAttachment.content, "base64") });
  }

  /*
    Sequential, lead first. Latency is free here (nobody is waiting), Resend's
    free tier rate-limits around 2 req/s so concurrent sends can trip it, and
    ordering guarantees the business-critical email wins if only one gets out.
  */
  await timed("email.lead", fields, () =>
    sendWithRetry(
      {
        from: FROM_EMAIL,
        to: CONTACT_TO_EMAIL,
        replyTo: body.email,
        subject: `New cost estimator lead: ${body.name}`,
        html: pdfAttachment
          ? buildEstimateLeadHtml(body, { proposalFailed: !proposal })
          : PDF_FAILED_BANNER + buildEstimateLeadHtml(body, { proposalFailed: !proposal }),
        ...(pdfAttachment ? { attachments: [pdfAttachment] } : {}),
      },
      { idempotencyKey: `${jobId}-lead`, jobId }
    )
  );

  // Without the PDF the visitor email would promise an attachment it doesn't
  // have. Skip it — the lead landed, so this can be followed up by hand.
  if (!pdfAttachment) {
    log("warn", "estimate.visitor.skipped", { ...fields, reason: "pdf_render_failed" });
    return;
  }

  await timed("email.visitor", fields, () =>
    sendWithRetry(
      {
        from: FROM_EMAIL,
        to: body.email,
        subject: "Your Evergreen Ridge Technology project estimate (draft)",
        html: buildEstimateVisitorHtml(body, proposal),
        attachments: [pdfAttachment],
      },
      { idempotencyKey: `${jobId}-visitor`, jobId }
    )
  );
}

estimateRouter.post("/", (req, res) => {
  const body = req.body;
  const jobId = randomUUID().slice(0, 8);

  // Same shape as the accepted response — a 200 here while the real path
  // returns 202 would tell a bot exactly which field is the trap.
  if (isHoneypotTripped(body)) {
    return res.status(202).json({ ok: true, status: "accepted", jobId });
  }

  if (!validateEstimatePayload(body)) {
    return res.status(400).json({ ok: false, error: "Invalid estimate submission." });
  }

  if (pendingCount() >= MAX_INFLIGHT) {
    log("warn", "estimate.rejected_overloaded", { jobId, pending: pendingCount() });
    return res.status(503).json({ ok: false, error: "Busy right now — please try again in a moment." });
  }

  res.status(202).json({ ok: true, status: "accepted", jobId });

  runInBackground("estimate.job", jobId, () => processEstimate(body, jobId));
});
