import { formatLongDate } from "@/lib/dates";

export type SubscriptionStatusBadgeProps = {
  status: "trial" | "active";
  targetDate: Date;
};

export function SubscriptionStatusBadge({
  status,
  targetDate,
}: SubscriptionStatusBadgeProps) {
  const isActive = status === "active";

  return (
    <div
      className={`inline-flex flex-wrap items-center gap-2 rounded-full border px-3 py-1 text-sm ${
        isActive
          ? "border-sage/30 bg-sage-soft text-sage"
          : "border-accent/30 bg-accent-soft text-accent"
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${
          isActive ? "bg-sage" : "bg-accent animate-pulse"
        }`}
        aria-hidden
      />
      <span className="font-semibold uppercase tracking-wide text-xs">
        {isActive ? "Subscribed" : "Trial"}
      </span>
      <span className="text-foreground/70">
        {isActive
          ? `since ${formatLongDate(targetDate)}`
          : `ends ${formatLongDate(targetDate)}`}
      </span>
    </div>
  );
}
