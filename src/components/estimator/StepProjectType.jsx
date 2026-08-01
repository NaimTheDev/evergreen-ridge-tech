import { PROJECT_TYPES } from "@/lib/estimator/pricing";
import clsx from "clsx";

const StepProjectType = ({ value, onChange }) => (
  <div>
    <h2 className="font-display text-lg font-semibold text-foreground">
      What are you building?
    </h2>
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {PROJECT_TYPES.map((type) => (
        <button
          key={type.key}
          type="button"
          onClick={() => onChange(type.key)}
          className={clsx(
            "rounded-2xl border-2 p-5 text-left transition",
            value === type.key
              ? "border-primary bg-accent/10"
              : "border-border hover:border-primary/50"
          )}
        >
          <span className="font-display text-base font-semibold text-foreground">
            {type.label}
          </span>
        </button>
      ))}
    </div>
  </div>
);

export default StepProjectType;
