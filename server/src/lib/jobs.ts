import { log } from "./log";

const pending = new Set<Promise<void>>();
let draining = false;

export const isDraining = () => draining;
export const pendingCount = () => pending.size;

/*
  background work for pdfjs
*/
export function runInBackground(evt: string, jobId: string, work: () => Promise<void>) {
  setImmediate(() => {
    const job = (async () => {
      // Terminal catch. Nothing above this may throw, so `pending` never holds
      // a rejected promise and drain() can never itself reject.
      try {
        await work();
        log("info", `${evt}.done`, { jobId });
      } catch (err) {
        log("error", `${evt}.failed`, {
          jobId,
          err: err instanceof Error ? err.message : String(err),
          stack: err instanceof Error ? err.stack : undefined,
        });
      }
    })();

    pending.add(job);
    // .finally() returns a NEW promise — discard it rather than tracking it.
    void job.finally(() => pending.delete(job));
  });
}

/** Waits for outstanding jobs. Returns how many were still running at timeout (0 = clean). */
export async function drain(timeoutMs: number): Promise<number> {
  draining = true;
  if (pending.size === 0) return 0;

  const timeout = new Promise<void>((resolve) => {
    setTimeout(resolve, timeoutMs).unref();
  });
  await Promise.race([Promise.allSettled([...pending]), timeout]);

  return pending.size;
}
