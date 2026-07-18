import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { LockedFeature } from "@/components/LockedFeature";
import { MemoryReceipt } from "@/components/MemoryReceipt";
import { MapOfUs } from "@/components/MapOfUs";
import { getSubscriptionStatus } from "@/lib/dates";
import { getMilestonesByCategory } from "@/lib/milestones";

export const metadata: Metadata = {
  title: "Post-Wedding",
  description: "Honeymoon and first weeks as a married couple.",
};

export default function PostWeddingPage() {
  const state = getSubscriptionStatus();
  const items = getMilestonesByCategory("post-wedding");

  return (
    <div className="space-y-10">
      <PageHero
        eyebrow="Active subscription"
        title="Post-wedding & honeymoon"
        description="Travels, first weeks, and the early product updates after go-live."
      />

      {!state.isMarried ? (
        <LockedFeature title="Post-wedding archive" />
      ) : items.length === 0 ? (
        <p className="text-muted">
          No post-wedding milestones yet. Add them with category{" "}
          <code>post-wedding</code> as the honeymoon unfolds.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {items.map((m) => (
            <MemoryReceipt
              key={m.id}
              invoiceId={m.id}
              date={m.date}
              title={m.title}
              amountLabel={m.amountLabel}
              description={m.description}
            />
          ))}
        </div>
      )}

      <MapOfUs title="Where the honeymoon might go" />
    </div>
  );
}
