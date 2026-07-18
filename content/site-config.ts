/** Core site constants for US, Inc. */

export const SITE_NAME = "US, Inc.";
export const TAGLINE =
  "The most successful merger of two people, live since 2026";
export const HERO_LINE =
  "Started as a free trial. Upgraded for life. No cancellations, no refunds — just renewals, every single year.";
export const FOOTER_COPY =
  "© 2026 US, Inc. All rights reserved. No cancellations. No refunds. Just renewals.";

/**
 * While the archive is incomplete, only the Trial Ends landing page is public.
 * Set to true (or env SITE_FULL_NAV=true) when how-we-met, family, guestbook, etc. are ready.
 */
export const SITE_FULL_RELEASE =
  process.env.NEXT_PUBLIC_SITE_FULL_RELEASE === "true";

/** Wedding / subscription start — midnight local of Dec 13, 2026 */
export const WEDDING_DATE = new Date("2026-12-13T00:00:00");

/** Partnership start for "days together" (first date) */
export const RELATIONSHIP_START = new Date("2026-02-14T00:00:00");

export const NAV_LINKS = [
  { href: "/", label: "Dashboard" },
  { href: "/how-we-met", label: "The Trial" },
  { href: "/pre-wedding", label: "Pre-Wedding" },
  { href: "/wedding", label: "The Wedding" },
  { href: "/post-wedding", label: "Post-Wedding" },
  { href: "/family-archive", label: "Family Archive" },
  { href: "/anniversaries", label: "Anniversaries" },
  { href: "/guestbook", label: "Guestbook" },
  { href: "/terms", label: "Terms & Vows" },
] as const;

export const PLAN_TIERS = [
  {
    name: "Free Trial",
    period: "First date → Engagement",
    includes: "Getting-to-know-you features, limited support hours 😄",
  },
  {
    name: "Engaged (Trial)",
    period: "Engagement → Dec 13, 2026",
    includes: 'Countdown timer, "trial ends" banner, wedding planning logs',
  },
  {
    name: "Married (Active Subscription)",
    period: "Dec 13, 2026 → forever",
    includes: "Full access, unlimited renewals, no cancellation policy",
  },
] as const;

export const EMPTY_STATE_COPY =
  "This feature unlocks Dec 13, 2026. Thank you for your patience — our engineering team (the two of us) is working hard.";

export const ANNIVERSARY_INTRO =
  "Auto-renews every Dec 13. Cancel anytime — except we won't.";

/**
 * S3 layout for live metrics (all counts start at 0 until objects exist):
 *
 *   photos/              — every image counts as one photo
 *   trips/{trip-slug}/   — each first-level folder under trips/ = one trip
 *   playlists/{id}/      — each folder = one playlist
 *   fights/{id}/         — each folder = one resolved fight (optional)
 *   family/              — family archive media
 *   trial/ pre-wedding/ wedding/ post-wedding/ anniversaries/ — chapter media
 */
export const S3_PREFIXES = {
  photos: "photos/",
  trips: "trips/",
  playlists: "playlists/",
  fights: "fights/",
  family: "family/",
} as const;
