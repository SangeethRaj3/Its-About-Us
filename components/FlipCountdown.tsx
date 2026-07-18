"use client";

import { useEffect, useState } from "react";
import {
  getSubscriptionStatus,
  getTimeRemaining,
  formatLongDate,
  type SubscriptionStatus,
} from "@/lib/dates";

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

function FlipDigit({
  digit,
  size = "md",
}: {
  digit: string;
  size?: "md" | "lg";
}) {
  const [display, setDisplay] = useState(digit);
  const [prev, setPrev] = useState(digit);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (digit === display) return;
    setPrev(display);
    setFlipping(true);
    const t = setTimeout(() => {
      setDisplay(digit);
      setFlipping(false);
    }, 700);
    return () => clearTimeout(t);
  }, [digit, display]);

  const box =
    size === "lg"
      ? "h-20 w-14 sm:h-28 sm:w-20"
      : "h-14 w-10 sm:h-16 sm:w-12";
  const text =
    size === "lg"
      ? "text-4xl sm:text-5xl"
      : "text-2xl sm:text-3xl";

  return (
    <div className={`flip-card relative ${box}`}>
      <div
        className={`flip-card-inner relative h-full w-full rounded-md bg-[#2a2520] text-center font-mono font-semibold tabular-nums text-[#faf9f6] shadow-md ${text}`}
      >
        <div className="flip-half top bg-[#2a2520]">
          <span className="digit-face block">{display}</span>
        </div>
        <div className="flip-half bottom bg-[#1f1b16]">
          <span className="digit-face block w-full">{display}</span>
        </div>
        <div className="pointer-events-none absolute left-0 right-0 top-1/2 z-20 h-px bg-black/40" />

        {flipping && (
          <>
            <div className="flip-half top z-30 bg-[#2a2520] flip-anim-top">
              <span className="digit-face block">{prev}</span>
            </div>
            <div className="flip-half bottom z-30 bg-[#1f1b16] flip-anim-bottom">
              <span className="digit-face block w-full">{display}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function FlipGroup({
  value,
  label,
  size = "md",
  minDigits = 2,
}: {
  value: number;
  label: string;
  size?: "md" | "lg";
  minDigits?: number;
}) {
  const digits = String(Math.max(0, value))
    .padStart(minDigits, "0")
    .split("");

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-3">
      <div className="flex gap-1 sm:gap-1.5">
        {digits.map((d, i) => (
          <FlipDigit key={`${label}-${i}-${digits.length}`} digit={d} size={size} />
        ))}
      </div>
      <span
        className={`font-medium uppercase tracking-[0.2em] text-muted ${
          size === "lg" ? "text-xs sm:text-sm" : "text-xs"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

export type FlipCountdownProps = {
  initialStatus?: SubscriptionStatus;
  /** Full-page Trial Ends hero treatment */
  variant?: "card" | "hero";
};

export function FlipCountdown({
  initialStatus,
  variant = "card",
}: FlipCountdownProps) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const state = getSubscriptionStatus(now ?? new Date());
  const status = initialStatus ?? state.status;
  const target = status === "trial" ? state.weddingDate : state.nextRenewal;
  const remaining = getTimeRemaining(target, now ?? new Date());
  const size = variant === "hero" ? "lg" : "md";

  const title =
    status === "trial" ? "Trial ends in" : "Next renewal in";

  const subline =
    status === "trial"
      ? "Upgrade is automatic — no action needed. Subscription starts Dec 13, 2026."
      : `Subscribed since ${formatLongDate(state.weddingDate)}. Status: Active. Next renewal: ${formatLongDate(state.nextRenewal)}.`;

  if (!now) {
    if (variant === "hero") {
      return (
        <div className="flex min-h-[40vh] items-center justify-center">
          <p className="text-sm text-muted">Loading calendar…</p>
        </div>
      );
    }
    return (
      <div className="rounded-xl border border-border bg-surface p-6 shadow-[var(--card-shadow)]">
        <p className="text-sm font-medium text-muted">Loading subscription clock…</p>
      </div>
    );
  }

  const clock = (
    <div className="flex flex-wrap items-end justify-center gap-3 sm:gap-6">
      <FlipGroup
        value={remaining.days}
        label="Days"
        size={size}
        minDigits={remaining.days > 99 ? 3 : 2}
      />
      <span
        className={`self-center pb-8 font-mono text-muted ${
          size === "lg" ? "text-3xl sm:text-4xl" : "text-2xl"
        }`}
      >
        :
      </span>
      <FlipGroup value={remaining.hours} label="Hours" size={size} />
      <span
        className={`self-center pb-8 font-mono text-muted ${
          size === "lg" ? "text-3xl sm:text-4xl" : "text-2xl"
        }`}
      >
        :
      </span>
      <FlipGroup value={remaining.minutes} label="Minutes" size={size} />
      <span
        className={`self-center pb-8 font-mono text-muted ${
          size === "lg" ? "text-3xl sm:text-4xl" : "text-2xl"
        }`}
      >
        :
      </span>
      <FlipGroup value={remaining.seconds} label="Seconds" size={size} />
    </div>
  );

  if (variant === "hero") {
    return (
      <div className="w-full max-w-4xl text-center">
        <div className="mb-8 flex flex-col items-center gap-4">
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
              status === "active"
                ? "bg-sage-soft text-sage"
                : "bg-accent-soft text-accent"
            }`}
          >
            {status === "active" ? "Active subscription" : "Free trial"}
          </span>
          <h1 className="font-serif text-4xl tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="font-mono text-sm text-muted sm:text-base">
            Target date · {formatLongDate(target)}
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-surface/80 px-4 py-8 shadow-[var(--card-shadow)] backdrop-blur-sm sm:px-10 sm:py-12">
          {clock}
        </div>

        <p className="mx-auto mt-8 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
          {subline}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-6 shadow-[var(--card-shadow)] sm:p-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <p className="font-serif text-lg text-foreground sm:text-xl">
          {title}
          <span className="text-muted">…</span>
        </p>
        <span
          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${
            status === "active"
              ? "bg-sage-soft text-sage"
              : "bg-accent-soft text-accent"
          }`}
        >
          {status === "active" ? "Active" : "Trial"}
        </span>
      </div>
      {clock}
      <p className="mt-5 text-center text-sm text-muted sm:text-left">{subline}</p>
    </div>
  );
}
