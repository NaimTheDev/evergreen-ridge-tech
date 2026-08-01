"use client";
import { useMemo, useState } from "react";
import clsx from "clsx";
import Container from "@/components/Container";
import FadeIn from "@/components/FadeIn";
import Button from "@/components/Button";
import { calculateEstimate } from "@/lib/estimator/pricing";
import StepProjectType from "./StepProjectType";
import StepFeatures from "./StepFeatures";
import StepComplexityTimeline from "./StepComplexityTimeline";
import StepContact from "./StepContact";
import EstimateResults from "./EstimateResults";

const STEPS = ["Project", "Features", "Scope", "Contact"];

const EstimatorWizard = () => {
  const [step, setStep] = useState(0);
  const [projectType, setProjectType] = useState("webApp");
  const [features, setFeatures] = useState([]);
  const [complexity, setComplexity] = useState("simple");
  const [timeline, setTimeline] = useState("standard");
  const [budget, setBudget] = useState("professional");
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const estimate = useMemo(
    () => calculateEstimate({ features, complexity, timeline }),
    [features, complexity, timeline]
  );

  const toggleFeature = (key) => {
    setFeatures((prev) =>
      prev.includes(key) ? prev.filter((f) => f !== key) : [...prev, key]
    );
  };

  const canProceed = step !== 1 || features.length > 0;
  const isLastStep = step === STEPS.length - 1;

  return (
    <Container className="mt-16 sm:mt-20">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <FadeIn>
          <div className="rounded-4xl border border-border bg-card p-8 sm:p-10">
            <div className="flex items-center gap-2">
              {STEPS.map((label, i) => (
                <div
                  key={label}
                  className={clsx(
                    "h-1.5 flex-1 rounded-full transition",
                    i <= step ? "bg-primary" : "bg-muted"
                  )}
                />
              ))}
            </div>
            <p className="mt-3 text-sm font-semibold text-muted-foreground">
              Step {step + 1} of {STEPS.length}: {STEPS[step]}
            </p>

            <div className="mt-8">
              {step === 0 && (
                <StepProjectType value={projectType} onChange={setProjectType} />
              )}
              {step === 1 && (
                <StepFeatures
                  selected={features}
                  onToggle={toggleFeature}
                  complexity={complexity}
                  timeline={timeline}
                />
              )}
              {step === 2 && (
                <StepComplexityTimeline
                  complexity={complexity}
                  onComplexityChange={setComplexity}
                  timeline={timeline}
                  onTimelineChange={setTimeline}
                />
              )}
              {step === 3 && (
                <StepContact
                  budget={budget}
                  onBudgetChange={setBudget}
                  notes={notes}
                  onNotesChange={setNotes}
                  name={name}
                  onNameChange={setName}
                  email={email}
                  onEmailChange={setEmail}
                />
              )}
            </div>

            <div className="mt-10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="text-sm font-semibold text-muted-foreground transition disabled:opacity-40"
              >
                Back
              </button>
              {!isLastStep && (
                <Button
                  type="button"
                  onClick={() =>
                    canProceed && setStep((s) => Math.min(STEPS.length - 1, s + 1))
                  }
                  className={clsx(!canProceed && "pointer-events-none opacity-40")}
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="lg:sticky lg:top-8">
            <EstimateResults
              estimate={estimate}
              projectType={projectType}
              complexity={complexity}
              timeline={timeline}
              budget={budget}
              notes={notes}
              name={name}
              email={email}
              onNameChange={setName}
              onEmailChange={setEmail}
              showEmailForm={isLastStep}
            />
          </div>
        </FadeIn>
      </div>
    </Container>
  );
};

export default EstimatorWizard;
