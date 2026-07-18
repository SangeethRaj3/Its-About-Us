import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { BillingHistoryList } from "@/components/BillingHistoryList";
import { MemoryReceipt } from "@/components/MemoryReceipt";
import { getMilestonesByCategory } from "@/lib/milestones";

export const metadata: Metadata = {
  title: "The Trial",
  description: "How we met — the free trial era of US, Inc.",
};

export default function HowWeMetPage() {
  const trial = getMilestonesByCategory("trial");

  return (
    <div className="space-y-10">
      <PageHero
        eyebrow="The Trial"
        title="How we met"
        description="Getting-to-know-you features enabled. Support hours: whenever we could. Conversion rate: 100%."
      />

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4 text-base leading-relaxed text-muted">
          <p>
            Every product starts with a first session. Ours was a free trial
            with no credit card required — just two people, a plan that was
            still loading, and a surprising amount of uptime.
          </p>
          <p>
            This chapter is the dating timeline: firsts, almosts, and the
            quiet decision that this wasn&apos;t a temporary subscription.
          </p>
          <p className="rounded-lg border border-border bg-surface p-4 text-sm">
            <strong className="text-foreground">Tip:</strong> Edit milestones in{" "}
            <code className="text-accent">content/milestones.json</code> and
            attach S3 photo keys as you upload memories.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="font-serif text-xl text-foreground">
            Trial invoices
          </h2>
          {trial.length > 0 ? (
            <div className="grid gap-6">
              {trial.map((m) => (
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
          ) : (
            <BillingHistoryList milestones={[]} />
          )}
        </div>
      </div>
    </div>
  );
}
