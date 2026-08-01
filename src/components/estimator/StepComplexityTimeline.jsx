import { COMPLEXITY_LEVELS, TIMELINE_OPTIONS } from "@/lib/estimator/pricing";
import clsx from "clsx";

const OptionCard = ({ active, onClick, label, description }) => (
  <button
    type="button"
    onClick={onClick}
    className={clsx(
      "rounded-2xl border-2 p-4 text-left transition",
      active
        ? "border-primary bg-accent/10"
        : "border-border hover:border-primary/50"
    )}
  >
    <span className="block font-display text-sm font-semibold text-foreground">
      {label}
    </span>
    {description && (
      <span className="mt-1 block text-xs text-muted-foreground">
        {description}
      </span>
    )}
  </button>
);

const StepComplexityTimeline = ({
  complexity,
  onComplexityChange,
  timeline,
  onTimelineChange,
}) => (
  <div className="space-y-8">
    <div>
      <h2 className="font-display text-lg font-semibold text-foreground">
        How complex is it?
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {COMPLEXITY_LEVELS.map((level) => (
          <OptionCard
            key={level.key}
            active={complexity === level.key}
            onClick={() => onComplexityChange(level.key)}
            label={level.label}
            description={level.description}
          />
        ))}
      </div>
    </div>
    <div>
      <h2 className="font-display text-lg font-semibold text-foreground">
        What&apos;s your timeline?
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {TIMELINE_OPTIONS.map((option) => (
          <OptionCard
            key={option.key}
            active={timeline === option.key}
            onClick={() => onTimelineChange(option.key)}
            label={option.label}
            description={option.description}
          />
        ))}
      </div>
    </div>
  </div>
);

export default StepComplexityTimeline;
