import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { contactRouter } from "./routes/contact";
import { estimateRouter } from "./routes/estimate";

const app = express();

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
