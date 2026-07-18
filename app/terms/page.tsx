import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Terms & Vows",
  description: "Terms of Service that are actually vows.",
};

const CLAUSES = [
  {
    id: "1.1",
    title: "Acceptance of Terms",
    body: "By saying “I do,” each party agrees to the terms herein, whether or not they have fully read the fine print (they haven’t). Continued cohabitation constitutes acceptance of amendments, including but not limited to new hobbies, furniture opinions, and snack policies.",
  },
  {
    id: "1.2",
    title: "Scope of Services",
    body: "Provider (each of us) shall furnish: listening without fixing (unless fixing is requested), celebration of small wins, emergency tea/coffee, and backup navigation when the map app lies. Services are available 24/7 with reasonable response times during sleep.",
  },
  {
    id: "2.1",
    title: "No Cancellation Policy",
    body: "This Agreement is non-cancellable. Trial periods have ended. Downgrades are not supported. Temporary bugs (arguments) shall be triaged with good faith, resolved without public incident reports when possible, and logged only as growth.",
  },
  {
    id: "2.2",
    title: "Refunds",
    body: "No refunds. All affection tendered is final sale. Emotional deposits compound daily. Early termination fees are measured in regret and are strongly discouraged by both legal and life counsel.",
  },
  {
    id: "3.1",
    title: "Uptime Commitment",
    body: "Parties commit to 99.9% emotional availability, exclusive of scheduled maintenance (alone time), force majeure (work deadlines), and acts of pets. Planned downtime shall be communicated in advance when feasible.",
  },
  {
    id: "3.2",
    title: "Data Sharing",
    body: "Passwords may be shared. Location may be shared. The last piece of dessert shall be offered first. Secrets that harm are not covered under this Agreement; honesty is the default transport layer.",
  },
  {
    id: "4.1",
    title: "Auto-Renewal",
    body: "This subscription auto-renews every December 13 for the lifetime of the parties. Each renewal includes one year of ordinary magic, extraordinary ordinary days, and at least one photo that will later become a billing-history thumbnail.",
  },
  {
    id: "4.2",
    title: "The Real Vow",
    body: "Beneath the parody: we choose each other, again and again. We promise patience when systems fail, humor when docs are wrong, and love that needs no SLA. We build a home that is product and poetry — US, Inc., forever in beta, forever shipping.",
  },
];

export default function TermsPage() {
  return (
    <div className="space-y-10">
      <PageHero
        eyebrow="Legal (sort of)"
        title="Terms & Vows"
        description="A Terms of Service that is actually our promises — written in mock-legal for a laugh, then softened into the real thing."
      />

      <div className="rounded-xl border border-border bg-surface p-6 shadow-[var(--card-shadow)] sm:p-8">
        <p className="font-mono text-xs uppercase tracking-wider text-muted">
          US, Inc. · Document TOS-VOWS-2026 · Effective Dec 13, 2026
        </p>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">
          These Terms govern the lifelong subscription between the undersigned
          co-founders. By proceeding past the free trial (dating) and engaged
          trial (planning), you acknowledge that love is the consideration and
          that forever is the term.
        </p>

        <ol className="mt-8 space-y-8">
          {CLAUSES.map((c) => (
            <li key={c.id}>
              <h2 className="font-serif text-xl text-foreground">
                <span className="mr-2 font-mono text-sm text-accent">
                  §{c.id}
                </span>
                {c.title}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
                {c.body}
              </p>
            </li>
          ))}
        </ol>

        <footer className="mt-10 border-t border-dashed border-border pt-6 font-mono text-xs text-muted">
          <p>Signed in hearts, not ink.</p>
          <p className="mt-2">
            S ________________ H ________________ Date: Dec 13, 2026
          </p>
          <p className="mt-4">
            © 2026 US, Inc. All rights reserved. No cancellations. No refunds.
            Just renewals.
          </p>
        </footer>
      </div>
    </div>
  );
}
