import { WEDDING_DATE, RELATIONSHIP_START } from "@/content/site-config";

export type SubscriptionStatus = "trial" | "active";

export type SubscriptionState = {
  status: SubscriptionStatus;
  /** Wedding date (trial end / subscription start) */
  weddingDate: Date;
  /** Next anniversary / renewal date */
  nextRenewal: Date;
  /** Years completed as "Married" (0 until first anniversary) */
  yearsSubscribed: number;
  /** True once wedding day has arrived */
  isMarried: boolean;
};

/**
 * Anniversary on Dec 13 of a given year (local midnight).
 */
export function anniversaryDate(year: number): Date {
  return new Date(year, 11, 13, 0, 0, 0, 0);
}

/**
 * Next renewal after `now`. On anniversary day itself, rolls to next year
 * once the day has started (renewal "successful").
 */
export function getNextRenewal(now: Date = new Date()): Date {
  const wedding = WEDDING_DATE;
  if (now < wedding) {
    return wedding;
  }

  let year = now.getFullYear();
  let candidate = anniversaryDate(year);

  // If we've already passed this year's anniversary moment, next is next year
  if (now >= candidate) {
    candidate = anniversaryDate(year + 1);
  }

  // Never before wedding
  if (candidate < wedding) {
    return wedding;
  }

  return candidate;
}

/**
 * Full subscription state driven by pure Date math — no backend.
 */
export function getSubscriptionStatus(now: Date = new Date()): SubscriptionState {
  const weddingDate = WEDDING_DATE;
  const isMarried = now >= weddingDate;

  if (!isMarried) {
    return {
      status: "trial",
      weddingDate,
      nextRenewal: weddingDate,
      yearsSubscribed: 0,
      isMarried: false,
    };
  }

  const nextRenewal = getNextRenewal(now);
  // Years completed = full anniversary years elapsed since wedding
  let yearsSubscribed = nextRenewal.getFullYear() - weddingDate.getFullYear() - 1;
  // If next renewal is still in wedding year somehow, clamp
  if (yearsSubscribed < 0) yearsSubscribed = 0;
  // On/after an anniversary that just happened this year:
  // nextRenewal is next year → years = nextYear - weddingYear - 1... wait
  // Example: wedding 2026, now Dec 14 2027 → next renewal Dec 13 2028
  // yearsSubscribed should be 1.
  // nextRenewal.year - wedding.year - 1 = 2028 - 2026 - 1 = 1 ✓
  // Example: wedding 2026, now Dec 13 2026 (day of) → next renewal Dec 13 2027
  // years = 2027 - 2026 - 1 = 0 ✓
  // Example: wedding 2026, now Jan 1 2027 → next Dec 13 2027
  // years = 2027 - 2026 - 1 = 0 ✓ (not yet first anniversary)

  return {
    status: "active",
    weddingDate,
    nextRenewal,
    yearsSubscribed,
    isMarried: true,
  };
}

export type TimeRemaining = {
  totalMs: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
};

export function getTimeRemaining(
  target: Date,
  now: Date = new Date()
): TimeRemaining {
  const totalMs = target.getTime() - now.getTime();
  if (totalMs <= 0) {
    return {
      totalMs: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPast: true,
    };
  }

  const seconds = Math.floor((totalMs / 1000) % 60);
  const minutes = Math.floor((totalMs / (1000 * 60)) % 60);
  const hours = Math.floor((totalMs / (1000 * 60 * 60)) % 24);
  const days = Math.floor(totalMs / (1000 * 60 * 60 * 24));

  return { totalMs, days, hours, minutes, seconds, isPast: false };
}

export function daysBetween(from: Date, to: Date = new Date()): number {
  const ms = to.getTime() - from.getTime();
  return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
}

export function daysTogether(now: Date = new Date()): number {
  return daysBetween(RELATIONSHIP_START, now);
}

export function formatLongDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date + "T00:00:00") : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Auto-generated anniversary renewal invoices after wedding day.
 */
export function getAnniversaryInvoices(now: Date = new Date()): Array<{
  id: string;
  date: string;
  title: string;
  category: "anniversary";
  description: string;
  photoKeys: string[];
}> {
  const state = getSubscriptionStatus(now);
  if (!state.isMarried || state.yearsSubscribed < 1) {
    return [];
  }

  const invoices = [];
  for (let y = 1; y <= state.yearsSubscribed; y++) {
    const year = WEDDING_DATE.getFullYear() + y;
    const invNum = String(4 + y).padStart(4, "0"); // INV-0005 = Year 1, etc.
    invoices.push({
      id: `INV-${invNum}`,
      date: `${year}-12-13`,
      title: `Year ${y} Anniversary`,
      category: "anniversary" as const,
      description: "Renewal successful. Auto-renew remains ON. No action required.",
      photoKeys: [] as string[],
    });
  }
  return invoices;
}
