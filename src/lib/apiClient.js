const API_BASE_URL = process.env.backend-api-url;

async function postJson(path, body) {
  if (!API_BASE_URL) {
    throw new Error(
      "backend-api-url is not configured. See docs/RENDER_BACKEND_SETUP.md."
    );
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Request to ${path} failed with status ${response.status}`);
  }

  return response.json();
}

export const submitContactForm = (data) => postJson("/api/contact", data);
export const submitEstimate = (data) => postJson("/api/estimate", data);
