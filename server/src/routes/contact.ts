import { Router } from "express";
import { sendMail, FROM_EMAIL, CONTACT_TO_EMAIL } from "../email/resend";
import { buildContactNotificationHtml } from "../email/templates";
import { isHoneypotTripped, validateContactPayload } from "../validate";

export const contactRouter = Router();

contactRouter.post("/", async (req, res) => {
  const body = req.body;

  if (isHoneypotTripped(body)) {
    return res.status(200).json({ ok: true });
  }

  if (!validateContactPayload(body)) {
    return res.status(400).json({ ok: false, error: "Invalid contact form submission." });
  }

  try {
    await sendMail({
      from: FROM_EMAIL,
      to: CONTACT_TO_EMAIL,
      replyTo: body.email,
      subject: `New contact form inquiry from ${body.name}`,
      html: buildContactNotificationHtml(body),
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Failed to send contact email", err);
    return res.status(502).json({ ok: false, error: "Failed to send email." });
  }
});
