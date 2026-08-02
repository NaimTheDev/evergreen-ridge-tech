import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { drain, isDraining, pendingCount } from "./lib/jobs";
import { log } from "./lib/log";
import { contactRouter } from "./routes/contact";
import { estimateRouter } from "./routes/estimate";

const app = express();

// Render puts the app behind its own reverse proxy, so the raw socket address
// is Render's proxy, not the visitor — every request would otherwise collapse
// to the same rate-limit bucket. Trusting 1 hop reads the real client IP from
// X-Forwarded-For instead. Verify after deploying (log req.ip on a request and
// compare to your own public IP); bump this if Render adds more hops in front.
app.set("trust proxy", 1);

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser requests (no Origin header, e.g. health checks).
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
  })
);

app.use(express.json({ limit: "200kb" }));

// How we tell "the endpoint got fast" from "the work got fast": after the
// estimate route went async this line should read ~5ms while the estimate.job
// logs still report the real 5-10s of work.
app.use((req, res, next) => {
  const start = process.hrtime.bigint();
  // Captured up front: "finish" can fire while Express is still inside router
  // dispatch, where req.path has been rewritten router-relative ("/" instead
  // of "/api/estimate"). originalUrl is stable.
  const path = req.originalUrl;
  res.on("finish", () => {
    log("info", "http", {
      m: req.method,
      p: path,
      s: res.statusCode,
      ms: Math.round(Number(process.hrtime.bigint() - start) / 1e6),
    });
  });
  next();
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter);

// app.get("/health", (_req, res) => {
//   if (isDraining()) {
//     return res.status(503).json({ ok: false, draining: true });
//   }
//   res.status(200).json({ ok: true });
// });

app.use("/api/contact", contactRouter);
app.use("/api/estimate", estimateRouter);

const port = Number(process.env.PORT) || 3001;
const server = app.listen(port, () => {
  log("info", "listening", { port });
});

/*
  Render sends SIGTERM on every deploy with roughly 30s before SIGKILL, and
  autoDeployTrigger is set to `commit` — so this path runs on every push, not
  just in emergencies. Now that /api/estimate finishes its work after the
  response, dying here means silently losing a lead.
*/
const SHUTDOWN_TIMEOUT_MS = Number(process.env.SHUTDOWN_TIMEOUT_MS) || 20_000;
let shuttingDown = false;

async function shutdown(signal: string, code = 0) {
  if (shuttingDown) return; // SIGTERM can arrive more than once
  shuttingDown = true;
  log("info", "shutdown.begin", { signal, pending: pendingCount() });

  server.close(() => log("info", "shutdown.server_closed"));
  server.closeIdleConnections?.(); // keep-alive sockets would hold the loop open

  const remaining = await drain(SHUTDOWN_TIMEOUT_MS);
  log("info", "shutdown.drained", { remaining });

  /*
    Deliberately not process.exit(): stdout is a pipe on Render and writes to a
    pipe are async, so exiting here discards whatever is still buffered — the
    drained line vanishes and it looks like the drain hung. The loop empties on
    its own now that the server is closed and the drain timer is unref'd.
  */
  process.exitCode = remaining > 0 ? 1 : code;
  setTimeout(() => process.exit(process.exitCode ?? 0), 5_000).unref();
}

process.on("SIGTERM", () => void shutdown("SIGTERM"));
process.on("SIGINT", () => void shutdown("SIGINT"));

// runInBackground has a terminal catch, so this should never fire. It's a
// canary: better a loud log line than a process that dies without a trace.
process.on("unhandledRejection", (reason) => {
  log("error", "unhandledRejection", { err: String(reason) });
});

// Not survivable — the process is in an unknown state, and continuing to serve
// from it produces worse failures than letting Render replace it. Still give
// in-flight jobs a short window first.
process.on("uncaughtException", (err) => {
  log("error", "uncaughtException", { err: err.message, stack: err.stack });
  void shutdown("uncaughtException", 1);
});
