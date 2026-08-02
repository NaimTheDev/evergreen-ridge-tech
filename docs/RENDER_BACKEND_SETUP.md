# Backend setup (Render + Resend)

The contact form and Cost Estimator send email through a small API in `/server`,
deployed to Render. The frontend never talks to an email provider directly — it
POSTs to this API, which builds the emails (and the estimate PDF) and sends them
via [Resend](https://resend.com).

## 1. Create a Resend account + verify your sending domain

1. Sign up at https://resend.com.
2. **Domains** → add `evergreenridgetech.com` (or whatever domain you want to send
   from) and add the DNS records Resend gives you. Sending won't work from that
   domain until it's verified — until then you can test with Resend's sandbox
   address `onboarding@resend.dev` as `FROM_EMAIL`, but sandbox mode can only
   deliver to the email address on your Resend account.
3. **API Keys** → create a key. Copy it — you'll set it as `RESEND_API_KEY` on Render.

## 2. Deploy `/server` to Render

You already have a Render account, so either:

**Option A — Blueprint (recommended):** This repo has a `render.yaml` at its root
with `rootDir: server`. In the Render dashboard, **New** → **Blueprint**, point it
at this repo, and Render will pick up `render.yaml` and provision the service.
You'll be prompted for the two `sync: false` secrets (`RESEND_API_KEY`,
`FROM_EMAIL`) during setup. `render.yaml` also sets `buildFilter: paths: [server/**]`,
so pushes to `main` that only touch the frontend won't trigger a pointless backend
redeploy — this is a Blueprint-only feature, so it's honored automatically here.

**Option B — Manual web service:** **New** → **Web Service**, connect this repo,
and set:
- **Root Directory:** `server`
- **Runtime:** Node
- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`

A manually-created service doesn't read `render.yaml` at all, so if you go this
route, set the same path scoping yourself under **Settings → Build & Deploy →
Build Filters** → include path `server/**` — otherwise every push to `main`
redeploys the backend even when only the frontend changed.

Either way, set these environment variables on the Render service (see
`server/.env.example` for the full list):

| Key | Value |
|---|---|
| `RESEND_API_KEY` | from step 1 |
| `FROM_EMAIL` | a verified sender, e.g. `notifications@evergreenridgetech.com` (or `onboarding@resend.dev` for testing) |
| `CONTACT_TO_EMAIL` | `naim@evergreenridgetech.com` |
| `ALLOWED_ORIGINS` | `https://www.evergreenridgetech.com,https://evergreenridgetech.com` (comma-separated; add `http://localhost:3000` too while testing) |

Render assigns the service a URL like `https://evergreen-ridge-tech-server.onrender.com`.

> Render's free plan spins the service down after 15 minutes of inactivity. The
> first request after idle time can take 30–50 seconds to wake it back up — the
> contact form and estimator will just show "Sending..." a bit longer than usual.
> Upgrade to a paid instance if that's not acceptable.

## 3. Point the frontend at the deployed API

**Local development** — copy `.env.local.example` to `.env.local` and set
`backend-api-url` to `http://localhost:3001` (or whatever `PORT` you run
`server` on locally).

**Production build (GitHub Actions)** — add a repository **variable** (not secret,
since it's just a public URL) named `API_BASE_URL` under **Settings → Secrets and
variables → Actions → Variables**, set to your Render service's URL. The deploy
workflow (`.github/workflows/deploy.yml`) reads it into the static build as
`backend-api-url`.

## 4. Run the backend locally

```
cd server
cp .env.example .env   # fill in RESEND_API_KEY, FROM_EMAIL, etc.
npm install
npm run dev             # http://localhost:3001
```

## 5. Test

With the backend running locally (or against the deployed Render URL) and
`backend-api-url` pointed at it, run `npm run dev` in the repo root and:

- Submit the contact form — confirm the notification email arrives at
  `naim@evergreenridgetech.com`.
- Walk `/cost-estimator` to completion and submit — confirm the visitor's inbox
  gets the HTML draft with a PDF attachment, and the internal lead notification
  (with the same PDF attached) arrives at `naim@evergreenridgetech.com`.
- Once deployed on Render, verify the rate limiter is keying requests by the real
  visitor IP and not Render's proxy: temporarily add `app.get("/debug-ip", (req, res) => res.send(req.ip))`,
  hit `https://<your-service>.onrender.com/debug-ip`, and confirm it matches your
  actual public IP (e.g. from https://ipify.org). `server/src/index.ts` sets
  `app.set("trust proxy", 1)`, which is correct for Render's documented single-hop
  `X-Forwarded-For` — if the IP doesn't match, increase the number and retest, then
  remove the debug route.
