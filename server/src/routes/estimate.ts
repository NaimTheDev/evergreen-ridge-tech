import { randomUUID } from "node:crypto";
import { Router } from "express";
import { sendWithRetry, FROM_EMAIL, CONTACT_TO_EMAIL } from "../email/resend";
import {
  buildEstimateLeadHtml,
  buildEstimateVisitorHtml,
  buildProposalFailedAlertHtml,
} from "../email/templates";
import { runProposalPipeline } from "../ai/proposalPipeline";
import { log, maskEmail, timed } from "../lib/log";
import { pendingCount, runInBackground } from "../lib/jobs";
import { EstimatePayload } from "../types";
import { isHoneypotTripped, validateEstimatePayload } from "../validate";

export const estimateRouter = Router();

/*
  Unlike /api/contact, which confirms delivery before responding, this route
  answers 202 and finishes the work in the background. Generating the AI
  proposal, rendering the PDF and sending the emails takes 10-30s on Render's
  free tier, and none of it is work the visitor needs to sit through. The
  tradeoff — we tell them "accepted" before we know it sent — is covered by
  sending the lead email first, before any of the slow or fallible work. Don't "fix" the asymmetry
  with contact.ts; it's deliberate.
*/

// The rate limiter (20 per 15min) used to double as a concurrency limiter,
// because a 5-10s handler self-throttled. At ~5ms it doesn't, so one client
// could queue 20 concurrent PDF renders on a fraction of a CPU.
const MAX_INFLIGHT = 3;

async function processEstimate(body: EstimatePayload, jobId: string) {
  const fields = { jobId, email: maskEmail(body.email) };

  /*
    Lead first, before any AI or PDF work. It only needs the form data, so it
    goes out in about a second instead of waiting on OpenAI and the render, and
    a slow or failed proposal can never hold up (or lose) the lead.
  */
  await timed("email.lead", fields, () =>
    sendWithRetry(
      {
        from: FROM_EMAIL,
        to: CONTACT_TO_EMAIL,
        replyTo: body.email,
        subject: `New cost estimator lead: ${body.name}`,
        html: buildEstimateLeadHtml(body),
      },
      { idempotencyKey: `${jobId}-lead`, jobId }
    )
  );

  const { proposal, pdfAttachment } = await timed("proposal.pipeline", fields, () =>
    runProposalPipeline(body, jobId)
  );
  if (pdfAttachment) {
    log("info", "pdf.size", { ...fields, bytes: Buffer.byteLength(pdfAttachment.content, "base64") });
  }

  // Without the PDF the visitor email would promise an attachment it doesn't
  // have. Skip it and tell us instead — the lead already landed, so this can be
  // followed up by hand.
  if (!pdfAttachment) {
    log("warn", "estimate.visitor.skipped", { ...fields, reason: "pdf_render_failed" });
    await timed("email.lead_alert", fields, () =>
      sendWithRetry(
        {
          from: FROM_EMAIL,
          to: CONTACT_TO_EMAIL,
          replyTo: body.email,
          subject: `Proposal failed for cost estimator lead: ${body.name}`,
          html: buildProposalFailedAlertHtml(body),
        },
        { idempotencyKey: `${jobId}-lead-alert`, jobId }
      )
    );
    return;
  }

  /*
    Sequential after the lead: latency is free here (nobody is waiting), and
    Resend's free tier rate-limits around 2 req/s so concurrent sends can trip it.
  */
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
