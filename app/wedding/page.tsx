import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { LockedFeature } from "@/components/LockedFeature";
import { MemoryReceipt } from "@/components/MemoryReceipt";
import { getSubscriptionStatus } from "@/lib/dates";
import { getMilestonesByCategory } from "@/lib/milestones";

export const metadata: Metadata = {
  title: "The Wedding",
  description: "December 13, 2026 — plan upgraded to Married.",
};

export default function WeddingPage() {
  const state = getSubscriptionStatus();
  const items = getMilestonesByCategory("wedding");

  return (
    <div className="space-y-10">
      <PageHero
        eyebrow="Main event"
        title="The Wedding"
        description="December 13, 2026. Ceremony, reception, guest moments — progressive release after the day ships."
      />

      {!state.isMarried ? (
        <LockedFeature
          title="Wedding day content"
          copy="This feature unlocks Dec 13, 2026. Our engineering team (the two of us) is currently in production. Thank you for your patience."
        />
      ) : (
        <section className="space-y-6">
          <p className="text-muted">
            Plan upgraded to Married. Auto-renew: ON. Below is the day as we
            archive it.
          </p>
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
        </section>
      )}

      {!state.isMarried && items.length > 0 && (
        <section className="opacity-60">
          <h2 className="mb-4 font-serif text-lg text-foreground">
            Scheduled invoice (preview)
          </h2>
          <div className="max-w-md">
            {items.slice(0, 1).map((m) => (
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
        </section>
      )}
    </div>
  );
}
