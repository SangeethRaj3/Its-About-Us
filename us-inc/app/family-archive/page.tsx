import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { FamilyTree } from "@/components/FamilyTree";
import familyStories from "@/content/family-stories.json";

export const metadata: Metadata = {
  title: "Family Archive",
  description:
    "Stories, photos, and memories from both families across generations.",
};

export default function FamilyArchivePage() {
  return (
    <div className="space-y-10">
      <PageHero
        eyebrow="Documentary mode"
        title="Family archive"
        description="Not just our relationship — both families across generations. Oral histories, scanned photos, and the tree that made US, Inc. possible."
      />

      <FamilyTree />

      <section className="space-y-4">
        <h2 className="font-serif text-2xl text-foreground">
          Oral history
        </h2>
        <p className="max-w-2xl text-sm text-muted">
          Collect short voice notes from parents and grandparents. Store audio
          under the <code>family/</code> S3 prefix and link{" "}
          <code>audioKey</code> in{" "}
          <code>content/family-stories.json</code>.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          {familyStories.map((story) => (
            <article
              key={story.id}
              className="rounded-xl border border-border bg-surface p-5 shadow-[var(--card-shadow)]"
            >
              <header className="mb-3">
                <h3 className="font-serif text-lg text-foreground">
                  {story.personName}
                </h3>
                <p className="text-xs uppercase tracking-wide text-muted">
                  {story.relation}
                  {story.year ? ` · ${story.year}` : ""}
                </p>
              </header>
              <p className="text-sm leading-relaxed text-muted">
                {story.storyText}
              </p>
              {story.audioKey ? (
                <p className="mt-3 font-mono text-xs text-accent">
                  Audio: {story.audioKey}
                </p>
              ) : (
                <p className="mt-3 text-xs text-muted italic">
                  No audio yet — record a clip when you can.
                </p>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
