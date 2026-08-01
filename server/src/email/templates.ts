import { BreakdownLine, ContactPayload, EstimatePayload } from "../types";

const LOGO_URL = "https://www.evergreenridgetech.com/email/logo.png";

export const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);

export const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const nl2br = (value: string) => escapeHtml(value).replace(/\n/g, "<br />");

function breakdownRowsHtml(lines: BreakdownLine[]) {
  return lines
    .map(
      (line) =>
        `<tr><td style="padding:6px 8px;border-bottom:1px solid #E6ECE9;">${escapeHtml(
          line.label
        )}</td><td style="padding:6px 8px;border-bottom:1px solid #E6ECE9;text-align:right;">${
          line.hours
        }</td><td style="padding:6px 8px;border-bottom:1px solid #E6ECE9;text-align:right;">${formatCurrency(
          line.cost
        )}</td></tr>`
    )
    .join("");
}

export function buildContactNotificationHtml(payload: ContactPayload) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #121212;">
      <h1 style="font-size: 18px;">New contact form inquiry</h1>
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      ${payload.company ? `<p><strong>Company:</strong> ${escapeHtml(payload.company)}</p>` : ""}
      ${payload.phone ? `<p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>` : ""}
      <p><strong>Message:</strong></p>
      <p>${nl2br(payload.message)}</p>
    </div>
  `;
}

export function buildEstimateVisitorHtml(payload: EstimatePayload) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #121212;">
      <img src="${LOGO_URL}" alt="Evergreen Ridge Technology" style="height: 60px; margin-bottom: 24px;" />
      <h1 style="font-size: 20px;">Your draft project estimate</h1>
      <p>Hi ${escapeHtml(payload.name)},</p>
      <p>Thanks for using our Cost Estimator. Here's a draft estimate for a <strong>${escapeHtml(
        payload.project_type
      )}</strong> project based on what you selected:</p>

      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <thead>
          <tr style="background: #0C3428; color: #F7F9F8;">
            <th style="text-align: left; padding: 8px;">Item</th>
            <th style="text-align: right; padding: 8px;">Hours</th>
            <th style="text-align: right; padding: 8px;">Cost</th>
          </tr>
        </thead>
        <tbody>
          ${breakdownRowsHtml([...payload.breakdown, ...payload.bufferLines])}
        </tbody>
      </table>

      <p style="font-size: 18px; font-weight: bold;">
        Estimated total: ${formatCurrency(payload.total_low)} – ${formatCurrency(payload.total_high)}
      </p>

      <p style="font-size: 12px; color: #64748B;">
        This is a non-binding, informational draft estimate only — not a quote or contract.
        Final scope and pricing are confirmed after a discovery conversation. A PDF copy of this
        draft is attached. See our
        <a href="https://www.evergreenridgetech.com/terms-of-service">Terms of Service</a> for details.
      </p>

      <p>Want to talk through the details? <a href="https://www.evergreenridgetech.com/contact">Get in touch</a> — we'd love to help.</p>

      <p>— The Evergreen Ridge Technology team</p>
    </div>
  `;
}

export function buildEstimateLeadHtml(payload: EstimatePayload) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #121212;">
      <h1 style="font-size: 18px;">New Cost Estimator submission</h1>
      <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
      <p><strong>Project type:</strong> ${escapeHtml(payload.project_type)}</p>
      <p><strong>Complexity:</strong> ${escapeHtml(payload.complexity)}</p>
      <p><strong>Timeline:</strong> ${escapeHtml(payload.timeline)}</p>
      <p><strong>Budget range:</strong> ${escapeHtml(payload.budget)}</p>
      ${payload.notes ? `<p><strong>Notes:</strong></p><p>${nl2br(payload.notes)}</p>` : ""}

      <p style="font-size: 16px; font-weight: bold;">
        Estimated total: ${formatCurrency(payload.total_low)} – ${formatCurrency(
    payload.total_high
  )} (${payload.total_hours} hrs)
      </p>

      <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
        <thead>
          <tr style="background: #0C3428; color: #F7F9F8;">
            <th style="text-align: left; padding: 8px;">Item</th>
            <th style="text-align: right; padding: 8px;">Hours</th>
            <th style="text-align: right; padding: 8px;">Cost</th>
          </tr>
        </thead>
        <tbody>
          ${breakdownRowsHtml([...payload.breakdown, ...payload.bufferLines])}
        </tbody>
      </table>
    </div>
  `;
}
