import { Router } from "express";
import { sendMail, FROM_EMAIL, CONTACT_TO_EMAIL } from "../email/resend";
import { buildEstimateLeadHtml, buildEstimateVisitorHtml } from "../email/templates";
import { generateEstimatePdf } from "../pdf/generateEstimatePdf";
import { isHoneypotTripped, validateEstimatePayload } from "../validate";

export const estimateRouter = Router();

estimateRouter.post("/", async (req, res) => {
  const body = req.body;

  if (isHoneypotTripped(body)) {
    return res.status(200).json({ ok: true });
  }

  if (!validateEstimatePayload(body)) {
    return res.status(400).json({ ok: false, error: "Invalid estimate submission." });
  }

  try {
    const pdfBuffer = await generateEstimatePdf(body);
    const pdfAttachment = {
      filename: "evergreen-ridge-draft-estimate.pdf",
      content: pdfBuffer.toString("base64"),
    };

    await Promise.all([
      sendMail({
        from: FROM_EMAIL,
        to: body.email,
        subject: "Your Evergreen Ridge Technology project estimate (draft)",
        html: buildEstimateVisitorHtml(body),
        attachments: [pdfAttachment],
      }),
      sendMail({
        from: FROM_EMAIL,
        to: CONTACT_TO_EMAIL,
        replyTo: body.email,
        subject: `New cost estimator lead: ${body.name}`,
        html: buildEstimateLeadHtml(body),
        attachments: [pdfAttachment],
      }),
    ]);

    return res.status(200).json({ ok: true });
  } catch (err) {
    //console.error("Failed to send estimate emails", err);
    return res.status(502).json({ ok: false, error: "Failed to send email." });
  }
});
