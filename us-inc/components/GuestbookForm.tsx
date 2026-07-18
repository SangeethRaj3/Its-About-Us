"use client";

import { useState } from "react";

export type GuestbookFormProps = {
  onSubmitted?: () => void;
};

export function GuestbookForm({ onSubmitted }: GuestbookFormProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Could not save your message.");
      }
      setStatus("ok");
      setName("");
      setMessage("");
      onSubmitted?.();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-border bg-surface p-5 shadow-[var(--card-shadow)]"
    >
      <div>
        <label htmlFor="gb-name" className="mb-1 block text-sm font-medium">
          Your name
        </label>
        <input
          id="gb-name"
          required
          maxLength={80}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-accent focus:ring-2"
          placeholder="Guest of honor"
        />
      </div>
      <div>
        <label htmlFor="gb-message" className="mb-1 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="gb-message"
          required
          maxLength={1000}
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none ring-accent focus:ring-2"
          placeholder="A note for S & H…"
        />
      </div>

      {status === "ok" && (
        <p className="text-sm text-sage">
          Message received. Thank you — it will appear after a quick review.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-accent">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {status === "loading" ? "Sending…" : "Sign guestbook"}
      </button>
    </form>
  );
}
