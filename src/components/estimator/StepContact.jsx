import { BUDGET_RANGES } from "@/lib/estimator/pricing";
import clsx from "clsx";

const StepContact = ({
  budget,
  onBudgetChange,
  notes,
  onNotesChange,
  name,
  onNameChange,
  email,
  onEmailChange,
}) => (
  <div className="space-y-8">
    <div>
      <h2 className="font-display text-lg font-semibold text-foreground">
        What&apos;s your budget range?
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {BUDGET_RANGES.map((range) => (
          <button
            key={range.key}
            type="button"
            onClick={() => onBudgetChange(range.key)}
            className={clsx(
              "rounded-2xl border-2 px-4 py-3 text-left text-sm font-medium transition",
              budget === range.key
                ? "border-primary bg-accent/10 text-foreground"
                : "border-border text-muted-foreground hover:border-primary/50"
            )}
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>

    <div>
      <label
        className="block text-sm font-semibold text-foreground"
        htmlFor="estimator-notes"
      >
        Tell us about your project
      </label>
      <textarea
        id="estimator-notes"
        value={notes}
        onChange={(e) => onNotesChange(e.target.value)}
        rows={3}
        className="mt-2 block w-full rounded-2xl border border-border bg-transparent px-4 py-3 text-sm text-foreground ring-4 ring-transparent transition focus:border-primary focus:outline-none focus:ring-primary/10"
        placeholder="Goals, must-haves, examples you like — the more you share, the better your proposal. (Optional)"
      />
    </div>

    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label
          className="block text-sm font-semibold text-foreground"
          htmlFor="estimator-name"
        >
          Name
        </label>
        <input
          id="estimator-name"
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          autoComplete="name"
          className="mt-2 block w-full rounded-2xl border border-border bg-transparent px-4 py-3 text-sm text-foreground ring-4 ring-transparent transition focus:border-primary focus:outline-none focus:ring-primary/10"
        />
      </div>
      <div>
        <label
          className="block text-sm font-semibold text-foreground"
          htmlFor="estimator-email"
        >
          Email
        </label>
        <input
          id="estimator-email"
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          autoComplete="email"
          className="mt-2 block w-full rounded-2xl border border-border bg-transparent px-4 py-3 text-sm text-foreground ring-4 ring-transparent transition focus:border-primary focus:outline-none focus:ring-primary/10"
        />
      </div>
    </div>
    <p className="text-xs text-muted-foreground">
      We&apos;ll email your draft estimate to this address. See our{" "}
      <a href="/privacy-policy" className="text-primary underline">
        Privacy Policy
      </a>
      .
    </p>
  </div>
);

export default StepContact;
