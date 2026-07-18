import { EMPTY_STATE_COPY } from "@/content/site-config";

export function LockedFeature({
  title = "Feature locked",
  copy = EMPTY_STATE_COPY,
}: {
  title?: string;
  copy?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-dashed border-border bg-surface p-8 text-center shadow-[var(--card-shadow)]">
      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(135deg,transparent,transparent_8px,rgba(31,27,22,0.03)_8px,rgba(31,27,22,0.03)_16px)]" />
      <div className="relative">
        <p className="mb-2 text-2xl" aria-hidden>
          🔒
        </p>
        <h2 className="font-serif text-xl text-foreground">{title}</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">{copy}</p>
      </div>
    </div>
  );
}
