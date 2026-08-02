"use client";
import { useState } from "react";
import {
  formatCurrency,
  PROJECT_TYPES,
  COMPLEXITY_LEVELS,
  TIMELINE_OPTIONS,
  BUDGET_RANGES,
} from "@/lib/estimator/pricing";
import { submitEstimate } from "@/lib/apiClient";
import Button from "@/components/Button";
import SendingOverlay from "./SendingOverlay";

const labelFor = (list, key) => list.find((item) => item.key === key)?.label ?? key;

/*
  The server now accepts the submission in a few milliseconds, which would flash
  the overlay open and shut. Hold it briefly instead — the spinner's rotation is
  1.2s, so ~1s lets it get most of the way round rather than snapping mid-turn.
*/
const MIN_OVERLAY_MS = 1000;

const errorMessageFor = (err) => {
  if (err?.status === 503) return "Our server is busy right now.";
  if (err?.status === 429) return "You've submitted a few times already.";
  return "Something went wrong on our end.";
};

const EstimateResults = ({
  estimate,
  projectType,
  complexity,
  timeline,
  budget,
  notes,
  name,
  email,
  onNameChange,
  onEmailChange,
  showEmailForm,
}) => {
  const [status, setStatus] = useState("idle");
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSend() {
    if (!name || !email) {
      setStatus("missing");
      return;
    }
    setStatus("sending");
    setOverlayOpen(true);

    const startedAt = Date.now();
    const settle = async (next) => {
      const remaining = MIN_OVERLAY_MS - (Date.now() - startedAt);
      if (remaining > 0) await new Promise((r) => setTimeout(r, remaining));
      setStatus(next);
    };

    try {
      await submitEstimate({
        name,
        email,
        project_type: labelFor(PROJECT_TYPES, projectType),
        complexity: labelFor(COMPLEXITY_LEVELS, complexity),
        timeline: labelFor(TIMELINE_OPTIONS, timeline),
        budget: labelFor(BUDGET_RANGES, budget),
        notes: notes || "",
        total_hours: estimate.totalHours,
        total_low: estimate.totalCostLow,
        total_high: estimate.totalCostHigh,
        breakdown: estimate.breakdown.map(({ label, hours, cost }) => ({ label, hours, cost })),
        bufferLines: estimate.bufferLines.map(({ label, hours, cost }) => ({ label, hours, cost })),
      });

      await settle("sent");
    } catch (err) {
      setErrorMessage(errorMessageFor(err));
      await settle("error");
    }
  }

  return (
    <div className="rounded-4xl border border-border bg-primary p-8 text-primary-foreground sm:p-10">
      {/* Renders through a portal, so it escapes this panel and covers the page. */}
      <SendingOverlay
        status={overlayOpen ? status : "idle"}
        email={email}
        errorMessage={errorMessage}
        onClose={() => setOverlayOpen(false)}
        onRetry={handleSend}
      />

      <h2 className="font-display text-base font-semibold">Your draft estimate</h2>

      <dl className="mt-6 space-y-3 text-sm">
        {estimate.breakdown.map((item) => (
          <div key={item.key} className="flex items-center justify-between gap-4">
            <dt className="text-primary-foreground/80">{item.label}</dt>
            <dd>{item.hours} hrs</dd>
          </div>
        ))}
        {estimate.breakdown.length === 0 && (
          <p className="text-primary-foreground/70">
            Select some features to see hours add up.
          </p>
        )}
      </dl>

      {estimate.breakdown.length > 0 && (
        <dl className="mt-4 space-y-2 border-t border-white/10 pt-4 text-xs text-primary-foreground/70">
          {estimate.bufferLines.map((item) => (
            <div key={item.key} className="flex items-center justify-between gap-4">
              <dt>{item.label}</dt>
              <dd>{item.hours} hrs</dd>
            </div>
          ))}
        </dl>
      )}

      {estimate.breakdown.length > 0 && (
        <div className="mt-6 border-t border-white/10 pt-6">
          <p className="text-xs uppercase tracking-wide text-primary-foreground/60">
            Estimated total
          </p>
          <p className="mt-1 font-display text-3xl font-semibold">
            {formatCurrency(estimate.totalCostLow)} – {formatCurrency(estimate.totalCostHigh)}
          </p>
          <p className="mt-1 text-xs text-primary-foreground/60">
            ~{estimate.totalHours} hours · non-binding draft
          </p>
        </div>
      )}

      {showEmailForm && (
        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="text-sm font-semibold">Email me this draft</p>
          <div className="mt-4 space-y-3">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              className="block w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50 focus:border-white focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => onEmailChange(e.target.value)}
              className="block w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50 focus:border-white focus:outline-none"
            />
            <Button
              type="button"
              invert
              onClick={handleSend}
              disabled={status === "sending"}
              className="w-full justify-center"
            >
              {status === "sending" ? "Sending..." : "Email me this draft"}
            </Button>
            {status === "missing" && (
              <p className="text-xs text-yellow-200">Add your name and email first.</p>
            )}
            {status === "sent" && (
              <p className="text-xs text-green-200">
                On its way — check your inbox in a minute.
              </p>
            )}
            {status === "error" && (
              <p className="text-xs text-red-200">
                {errorMessage || "Something went wrong."} Please email
                contact@evergreenridgetech.com directly.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EstimateResults;
