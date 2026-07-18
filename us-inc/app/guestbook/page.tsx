import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { GuestbookForm } from "@/components/GuestbookForm";
import guestbook from "@/content/guestbook.json";

export const metadata: Metadata = {
  title: "Guestbook",
  description: "Leave a message for S & H — wedding guests welcome.",
};

export default function GuestbookPage() {
  const entries = guestbook.filter((e) => e.approved);

  return (
    <div className="space-y-10">
      <PageHero
        eyebrow="Public channel"
        title="Guestbook"
        description="Wedding guests and friends — leave a note. Messages are moderated before they appear on the wall."
      />

      <div className="grid gap-10 lg:grid-cols-2">
        <GuestbookForm />

        <section className="space-y-4">
          <h2 className="font-serif text-xl text-foreground">
            Recent messages
          </h2>
          {entries.length === 0 ? (
            <p className="text-sm text-muted">No approved messages yet.</p>
          ) : (
            <ul className="space-y-3">
              {entries.map((entry) => (
                <li
                  key={entry.id}
                  className="rounded-xl border border-border bg-surface p-4 shadow-[var(--card-shadow)]"
                >
                  <p className="text-sm leading-relaxed text-foreground">
                    &ldquo;{entry.message}&rdquo;
                  </p>
                  <p className="mt-2 text-xs text-muted">
                    — {entry.name}
                    {entry.createdAt && (
                      <>
                        {" · "}
                        {new Date(entry.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </>
                    )}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
