import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", limiter);

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.use("/api/contact", contactRouter);
app.use("/api/estimate", estimateRouter);

const port = Number(process.env.PORT) || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
