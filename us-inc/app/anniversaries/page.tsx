import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { FlipCountdown } from "@/components/FlipCountdown";
import { MemoryReceipt } from "@/components/MemoryReceipt";
import { ANNIVERSARY_INTRO } from "@/content/site-config";
import { getAnniversaryInvoices, getSubscriptionStatus } from "@/lib/dates";

export const metadata: Metadata = {
  title: "Anniversary Log",
  description: "Auto-renews every December 13. Each year is a renewal.",
};

export default function AnniversariesPage() {
  const state = getSubscriptionStatus();
  const renewals = getAnniversaryInvoices();

  return (
    <div className="space-y-10">
      <PageHero
        eyebrow="Renewal history"
        title="Anniversary log"
        description={ANNIVERSARY_INTRO}
      />

      {state.isMarried ? (
        <FlipCountdown />
      ) : (
        <p className="rounded-lg border border-border bg-surface p-4 text-sm text-muted">
          First renewal scheduled for Dec 13, 2027 — one year after the
          wedding day upgrade. The log will grow automatically each anniversary.
        </p>
      )}

      <section className="space-y-4">
        <h2 className="font-serif text-2xl text-foreground">
          Successful renewals
        </h2>
        {renewals.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-surface p-8 text-center">
            <p className="font-serif text-lg text-foreground">
              No renewals yet
            </p>
            <p className="mt-2 text-sm text-muted">
              Year 1 goes live Dec 13, 2027. Bring a photo and a short
              reflection each year.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2">
            {renewals.map((m) => (
              <MemoryReceipt
                key={m.id}
                invoiceId={m.id}
                date={m.date}
                title={m.title}
                amountLabel="Another year"
                description={m.description}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
