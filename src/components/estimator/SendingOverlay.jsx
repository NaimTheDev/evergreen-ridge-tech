"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Button from "@/components/Button";

/*
  The server accepts the submission in ~5ms and does the PDF render and emails
  in the background, so stage 0 is all anyone normally sees. The later stages
  are for the cold-start case: the backend spins down after 15 minutes idle and
  the first request back can take 30-50s.

  These deliberately don't narrate the PDF or the email — once the server
  responds before doing that work, the browser has no idea whether either has
  happened, so claiming it would be fiction.
*/
const STAGES = [
  "Sending your details",
  "Still working — our server may be waking up",
  "Almost there, thanks for waiting!",
];

const STAGE_MS = 2400;

const Spinner = () => {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative h-16 w-16">
      <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl" />
      <svg viewBox="0 0 50 50" className="relative h-full w-full">
        <circle
          cx="25"
          cy="25"
          r="21"
          fill="none"
          strokeWidth="4"
          className="stroke-primary/15"
        />
        <motion.circle
          cx="25"
          cy="25"
          r="21"
          fill="none"
          strokeWidth="4"
          strokeLinecap="round"
          className="stroke-primary"
          strokeDasharray="132"
          initial={{ strokeDashoffset: 110, rotate: 0 }}
          animate={
            reduceMotion
              ? { strokeDashoffset: 110 }
              : { strokeDashoffset: [110, 40, 110], rotate: 360 }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  strokeDashoffset: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 1.2, repeat: Infinity, ease: "linear" },
                }
          }
          style={{ originX: "50%", originY: "50%" }}
        />
      </svg>
    </div>
  );
};

const SuccessMark = () => (
  <div className="relative flex h-16 w-16 items-center justify-center">
    <motion.span
      className="absolute inset-0 rounded-full bg-primary/10"
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    />
    <svg viewBox="0 0 50 50" className="relative h-full w-full">
      <motion.circle
        cx="25"
        cy="25"
        r="21"
        fill="none"
        strokeWidth="4"
        className="stroke-primary"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <motion.path
        d="M16 25.5 22.5 32 34.5 19"
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-primary"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.35, delay: 0.35, ease: "easeOut" }}
      />
    </svg>
  </div>
);

const ErrorMark = () => (
  <div className="relative flex h-16 w-16 items-center justify-center">
    <span className="absolute inset-0 rounded-full bg-red-500/10" />
    <svg viewBox="0 0 50 50" className="relative h-full w-full">
      <circle cx="25" cy="25" r="21" fill="none" strokeWidth="4" className="stroke-red-500" />
      <path
        d="M18 18 32 32M32 18 18 32"
        fill="none"
        strokeWidth="4"
        strokeLinecap="round"
        className="stroke-red-500"
      />
    </svg>
  </div>
);

const SendingOverlay = ({ status, email, errorMessage, onClose, onRetry }) => {
  const [mounted, setMounted] = useState(false);
  const [stage, setStage] = useState(0);
  const isOpen = status === "sending" || status === "sent" || status === "error";
  const isDismissible = status === "sent" || status === "error";

  useEffect(() => setMounted(true), []);

  // Walk the copy forward while we wait, then hold on the last line.
  useEffect(() => {
    if (status !== "sending") {
      setStage(0);
      return;
    }
    const id = setInterval(
      () => setStage((s) => Math.min(s + 1, STAGES.length - 1)),
      STAGE_MS
    );
    return () => clearInterval(id);
  }, [status]);

  useEffect(() => {
    if (!isOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isDismissible) return;
    const onKeyDown = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isDismissible, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="dialog"
          aria-modal="true"
          aria-label="Sending your estimate"
        >
          <div
            className="absolute inset-0 bg-neutral-950/50 backdrop-blur-sm"
            onClick={isDismissible ? onClose : undefined}
          />

          <motion.div
            className="relative w-full max-w-sm rounded-4xl border border-border bg-card p-10 text-center text-card-foreground shadow-2xl"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex justify-center">
              {status === "sending" && <Spinner />}
              {status === "sent" && <SuccessMark />}
              {status === "error" && <ErrorMark />}
            </div>

            <div className="mt-6 min-h-[4.5rem]" aria-live="polite">
              {status === "sending" && (
                <>
                  <h2 className="font-display text-lg font-semibold">
                    Sending your estimate
                  </h2>
                  <div className="mt-2 h-10">
                    <AnimatePresence mode="wait">
                      <motion.p
                        key={stage}
                        className="text-sm text-muted-foreground"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25 }}
                      >
                        {STAGES[stage]}…
                      </motion.p>
                    </AnimatePresence>
                  </div>
                </>
              )}

              {status === "sent" && (
                <>
                  <h2 className="font-display text-lg font-semibold">Got it</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Your draft estimate is on its way
                    {email ? (
                      <>
                        {" "}
                        to <span className="font-semibold text-foreground">{email}</span>
                      </>
                    ) : null}
                    . It usually lands within a minute — check your spam folder if it
                    doesn&apos;t.
                  </p>
                </>
              )}

              {status === "error" && (
                <>
                  <h2 className="font-display text-lg font-semibold">
                    That didn&apos;t go through
                  </h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {errorMessage || "Something went wrong on our end."} Try again, or
                    email us at{" "}
                    <span className="font-semibold text-foreground">
                      contact@evergreenridgetech.com
                    </span>
                    .
                  </p>
                </>
              )}
            </div>

            {status === "sending" && (
              <p className="mt-6 text-xs text-muted-foreground/70">
                This usually takes a moment.
              </p>
            )}

            {status === "sent" && (
              <Button
                type="button"
                onClick={onClose}
                className="mt-8 w-full justify-center"
              >
                Done
              </Button>
            )}

            {status === "error" && (
              <div className="mt-8 flex flex-col gap-3">
                <Button type="button" onClick={onRetry} className="w-full justify-center">
                  Try again
                </Button>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-sm font-semibold text-muted-foreground transition hover:text-foreground"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default SendingOverlay;
