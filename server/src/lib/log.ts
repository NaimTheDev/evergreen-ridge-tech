type Level = "info" | "warn" | "error";
type Fields = Record<string, unknown>;

// One line of JSON per event. Render's log viewer is line-oriented, so this
// stays both greppable ("evt":"pdf.render.ok") and parseable.
export function log(level: Level, evt: string, fields: Fields = {}) {
  const line = JSON.stringify({ t: new Date().toISOString(), level, evt, ...fields });
  if (level === "error") {
    console.error(line);
  } else {
    console.log(line);
  }
}

export async function timed<T>(
  evt: string,
  fields: Fields,
  fn: () => Promise<T>
): Promise<T> {
  const start = process.hrtime.bigint();
  const elapsedMs = () => Math.round(Number(process.hrtime.bigint() - start) / 1e6);

  try {
    const result = await fn();
    log("info", `${evt}.ok`, { ...fields, ms: elapsedMs() });
    return result;
  } catch (err) {
    log("error", `${evt}.fail`, {
      ...fields,
      ms: elapsedMs(),
      err: err instanceof Error ? err.message : String(err),
    });
    throw err;
  }
}

// Lead data does not belong in a log aggregator. Keep enough to correlate a
// complaint with a log line, not enough to reconstruct the address.
export function maskEmail(email: string) {
  const [user = "", domain = ""] = email.split("@");
  if (!domain) return "***";
  return `${user.slice(0, 1)}***@${domain}`;
}
