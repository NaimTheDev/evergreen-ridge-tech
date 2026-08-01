import emailjs from "@emailjs/browser";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export const EMAILJS_TEMPLATES = {
  contact: process.env.NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID,
  estimateVisitor: process.env.NEXT_PUBLIC_EMAILJS_ESTIMATE_VISITOR_TEMPLATE_ID,
  estimateLead: process.env.NEXT_PUBLIC_EMAILJS_ESTIMATE_LEAD_TEMPLATE_ID,
};

export async function sendEmail(templateId, params) {
  if (!SERVICE_ID || !PUBLIC_KEY || !templateId) {
    throw new Error(
      "EmailJS is not configured. Set NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_PUBLIC_KEY, and the relevant template id env vars."
    );
  }

  return emailjs.send(SERVICE_ID, templateId, params, { publicKey: PUBLIC_KEY });
}
