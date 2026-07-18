"use client";

import { useState } from "react";

export type UploadCategory =
  | "trial"
  | "pre-wedding"
  | "wedding"
  | "post-wedding"
  | "family"
  | "anniversaries"
  | "photos"
  | "trips"
  | "playlists"
  | "fights";

export type PhotoUploaderProps = {
  category: UploadCategory;
  /** Required for trips / playlists / fights — becomes the folder name under that prefix */
  folderSlug?: string;
  onUploadComplete?: (s3Key: string) => void;
};

export function PhotoUploader({
  category,
  folderSlug: folderSlugProp,
  onUploadComplete,
}: PhotoUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [folderSlug, setFolderSlug] = useState(folderSlugProp ?? "");
  const [status, setStatus] = useState<
    "idle" | "requesting" | "uploading" | "done" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const [lastKey, setLastKey] = useState("");

  const needsFolder =
    category === "trips" || category === "playlists" || category === "fights";

  async function handleUpload() {
    if (!file) return;
    if (needsFolder && !folderSlug.trim()) {
      setStatus("error");
      setMessage("Enter a folder name (e.g. bali-2026 for a trip).");
      return;
    }

    setStatus("requesting");
    setMessage("");

    try {
      const res = await fetch("/api/s3-upload-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          contentType: file.type || "application/octet-stream",
          category,
          folderSlug: folderSlug.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Could not get upload URL");
      }

      setStatus("uploading");
      const put = await fetch(data.uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type || "application/octet-stream" },
        body: file,
      });
      if (!put.ok) {
        throw new Error(`S3 upload failed (${put.status})`);
      }

      setLastKey(data.key);
      setStatus("done");
      setMessage(`Uploaded. Key: ${data.key}`);
      onUploadComplete?.(data.key);
      setFile(null);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Upload failed");
    }
  }

  return (
    <div className="space-y-4 rounded-xl border border-border bg-surface p-5 shadow-[var(--card-shadow)]">
      <div>
        <p className="text-sm font-medium text-foreground">
          Upload to <code className="text-accent">{category}/</code>
          {needsFolder && folderSlug.trim() && (
            <code className="text-accent">{folderSlug.trim()}/</code>
          )}
        </p>
        <p className="mt-1 text-xs text-muted">
          {needsFolder
            ? "Each unique folder name under trips/ counts as one trip (same for playlists & fights)."
            : "Direct-to-S3 via presigned URL. Bucket stays private."}
        </p>
      </div>

      {needsFolder && (
        <div>
          <label className="mb-1 block text-xs font-medium text-muted">
            Folder name
          </label>
          <input
            type="text"
            value={folderSlug}
            onChange={(e) => setFolderSlug(e.target.value)}
            placeholder={
              category === "trips" ? "e.g. ooty-2026" : "e.g. road-trip-mix"
            }
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-accent focus:ring-2"
          />
        </div>
      )}

      <input
        type="file"
        accept="image/*,audio/*"
        onChange={(e) => {
          setFile(e.target.files?.[0] ?? null);
          setStatus("idle");
          setMessage("");
        }}
        className="block w-full text-sm text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-accent file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white"
      />

      <button
        type="button"
        disabled={!file || status === "requesting" || status === "uploading"}
        onClick={handleUpload}
        className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition hover:opacity-90 disabled:opacity-40"
      >
        {status === "requesting"
          ? "Requesting URL…"
          : status === "uploading"
            ? "Uploading…"
            : "Upload"}
      </button>

      {message && (
        <p
          className={`text-sm ${
            status === "error" ? "text-accent" : "text-sage"
          }`}
        >
          {message}
        </p>
      )}

      {lastKey && status === "done" && (
        <p className="break-all font-mono text-xs text-muted">
          Object key saved. Metrics recount from S3 on the next full-site
          dashboard load.
        </p>
      )}
    </div>
  );
}
