import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { MemoryReceipt } from "@/components/MemoryReceipt";
import { FlipCountdown } from "@/components/FlipCountdown";
import { getMilestonesByCategory } from "@/lib/milestones";

export const metadata: Metadata = {
  title: "Pre-Wedding",
  description: "Engagement trial period — planning logs and countdown.",
};

export default function PreWeddingPage() {
  const items = getMilestonesByCategory("pre-wedding");

  return (
    <div className="space-y-10">
      <PageHero
        eyebrow="Engaged (Trial)"
        title="Pre-wedding"
        description='Countdown timer enabled. "Trial ends" banner active. Wedding planning logs write-heavy, sleep-light.'
      />

      <FlipCountdown />

      <section className="space-y-4">
        <h2 className="font-serif text-2xl text-foreground">Planning logs</h2>
        <p className="max-w-2xl text-muted">
          Engagement shoot, vendor chaos, family group chats that never mute —
          this is the upgrade path from dating to Married.
        </p>
        {items.length === 0 ? (
          <p className="text-sm text-muted">
            No pre-wedding invoices yet. Add entries with category{" "}
            <code>pre-wedding</code> in milestones.json.
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
      </section>
    </div>
  );
}
