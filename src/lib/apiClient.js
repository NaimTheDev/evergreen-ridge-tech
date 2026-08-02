const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

async function postJson(path, body) {
  if (!API_BASE_URL) {
    throw new Error(
      "NEXT_PUBLIC_BACKEND_API_URL is not configured. See docs/RENDER_BACKEND_SETUP.md."
    );
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = new Error(`Request to ${path} failed with status ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export const submitContactForm = (data) => postJson("/api/contact", data);
export const submitEstimate = (data) => postJson("/api/estimate", data);
