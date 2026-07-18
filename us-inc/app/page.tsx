import { FlipCountdown } from "@/components/FlipCountdown";
import { TAGLINE } from "@/content/site-config";

export default function HomePage() {
  return (
    <div className="relative flex min-h-[calc(100vh-0px)] flex-col items-center justify-center px-4 py-12 sm:px-6">
      {/* soft background wash */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(179,67,92,0.08), transparent), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(92,122,92,0.06), transparent)",
        }}
      />

      <div className="mb-10 flex flex-col items-center gap-3 text-center">
        <p className="max-w-md text-sm text-muted sm:text-base">{TAGLINE}</p>
      </div>

      <FlipCountdown variant="hero" />

      <p className="mt-16 max-w-sm text-center font-mono text-[11px] leading-relaxed text-muted/80">
        No cancellations. No refunds. Just renewals.
      </p>
    </div>
  );
}
