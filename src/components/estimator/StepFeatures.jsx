import { FEATURES, calculateEstimate } from "@/lib/estimator/pricing";
import clsx from "clsx";

const StepFeatures = ({ selected, onToggle, complexity, timeline }) => {
  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-foreground">
        What features do you need?
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Select all that apply — estimated hours update as you go.
      </p>
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {FEATURES.map((feature) => {
          const isSelected = selected.includes(feature.key);
          const { breakdown } = calculateEstimate({
            features: [feature.key],
            complexity,
            timeline,
          });
          const hours = breakdown[0]?.hours ?? 0;
          return (
            <label
              key={feature.key}
              className={clsx(
                "flex cursor-pointer items-center justify-between gap-3 rounded-2xl border-2 px-4 py-3 transition",
                isSelected
                  ? "border-primary bg-accent/10"
                  : "border-border hover:border-primary/50"
              )}
            >
              <span className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => onToggle(feature.key)}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                <span className="text-sm font-medium text-foreground">
                  {feature.label}
                </span>
              </span>
              <span className="whitespace-nowrap text-xs text-muted-foreground">
                ~{hours} hrs
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default StepFeatures;
