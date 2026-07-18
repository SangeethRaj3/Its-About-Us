import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PhotoUploader } from "@/components/PhotoUploader";
import { isS3Configured } from "@/lib/s3";

export const metadata: Metadata = {
  title: "Admin Upload",
  description: "Private upload panel for US, Inc. co-founders.",
};

const CATEGORIES = [
  "photos",
  "trips",
  "playlists",
  "fights",
  "trial",
  "pre-wedding",
  "wedding",
  "post-wedding",
  "family",
  "anniversaries",
] as const;

export default function AdminUploadPage() {
  const configured = isS3Configured();

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:px-6">
      <PageHero
        eyebrow="Co-founders only"
        title="Upload panel"
        description="S3 layout: photos/ for images, trips/{name}/ per trip, playlists/{name}/, fights/{name}/. Counts start at 0 until folders exist."
      />

      {!configured && (
        <div className="rounded-lg border border-accent/30 bg-accent-soft px-4 py-3 text-sm text-foreground">
          <strong>AWS not configured.</strong> Add credentials to{" "}
          <code>.env.local</code>. Metrics stay at 0 until the bucket is wired.
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {CATEGORIES.map((cat) => (
          <PhotoUploader key={cat} category={cat} />
        ))}
      </div>
    </div>
  );
}
