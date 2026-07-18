import { MemoryReceipt } from "@/components/MemoryReceipt";
import type { Milestone } from "@/lib/milestones";

export type BillingHistoryListProps = {
  milestones: Milestone[];
  /** Optional map of photoKey → signed URL */
  photoUrlMap?: Record<string, string>;
};

export function BillingHistoryList({
  milestones,
  photoUrlMap = {},
}: BillingHistoryListProps) {
  if (milestones.length === 0) {
    return (
      <p className="text-sm text-muted">
        No invoices yet. The billing department (us) is still onboarding.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {milestones.map((m) => (
        <MemoryReceipt
          key={m.id}
          invoiceId={m.id}
          date={m.date}
          title={m.title}
          amountLabel={m.amountLabel}
          description={m.description}
          photoUrls={m.photoKeys
            .map((k) => photoUrlMap[k])
            .filter(Boolean)}
        />
      ))}
    </div>
  );
}
