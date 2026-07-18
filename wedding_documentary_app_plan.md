# US, Inc. — Wedding Documentary Web App Plan

**App name:** US, Inc.
**Tagline idea:** "The most successful merger of two people, live since 2026"
**Wedding date:** December 13, 2026
**First renewal (anniversary):** December 13, 2027
**Core concept:** A personal documentary site disguised as a SaaS subscription dashboard — your relationship as a "product" with a trial period, a subscription start date, and lifetime auto-renewal.

**Stack:** Next.js (App Router) + TypeScript + Tailwind CSS, deployed on Vercel.
**Storage:** Private AWS S3 bucket, in-app upload feature, signed URLs for access.

---

## 1. Brand Voice: "US, Inc."

Treat it like a real company brand throughout the app:
- Logo/wordmark: an **S ♥ H monogram** — the heart doubling as the "merger" symbol between initials, styled like a tech logo (clean lines, maybe interlocking like a company crest). This becomes your favicon, header mark, and can even appear as a small watermark on photos.
- Footer: `© 2026 US, Inc. All rights reserved. No cancellations. No refunds. Just renewals.`
- Browser tab title: "US, Inc. — Dashboard" (or per-page, e.g. "US, Inc. — Billing History")

---

## 2. The Subscription Gimmick (the heart of the idea)

This is your strongest, most original hook — lean into it hard, but keep the site itself mostly warm and documentary; save the SaaS-parody humor for specific components so it doesn't overwhelm the emotional content.

**Plan tiers (relationship history as a pricing page):**
| Plan | Period | What's included |
|---|---|---|
| Free Trial | First date → Engagement | Getting-to-know-you features, limited support hours 😄 |
| Engaged (Trial) | Engagement → Dec 13, 2026 | Countdown timer, "trial ends" banner, wedding planning logs |
| Married (Active Subscription) | Dec 13, 2026 → forever | Full access, unlimited renewals, no cancellation policy |

**Live countdown/status widget** (homepage hero) — see Section 6 for the flip-clock spec:
- Before wedding: *"Trial ends in 47 days, 6 hours, 12 minutes — upgrade is automatic, no action needed."*
- On/after wedding: *"Subscribed since Dec 13, 2026. Status: Active. Next renewal: Dec 13, 2027."*
- After each anniversary, it auto-updates to the next renewal year, and a small "renewal history" log grows underneath (like a billing history).

**"Billing history" = milestone log**, styled like invoices:
- `INV-0001 — First Date — Paid in full, no refunds requested`
- `INV-0002 — First "I love you" — Priceless (system error: amount cannot be $0)`
- `INV-0003 — The Proposal — Lifetime plan activated`
- `INV-0004 — Wedding Day — Plan upgraded to Married, auto-renew: ON`
- Future entries auto-append each anniversary: `INV-00XX — Year 1 Anniversary — Renewal successful`

**Fake "Terms of Service"** page that's actually your real vows/promises to each other, written in mock-legal language for a laugh, then softened into the real thing.

**"System uptime" stats bar:** Days together, photos captured, trips taken, fights survived and resolved, playlists made — shown like SaaS analytics ("99.9% uptime since 2023").

---

## 3. Site Structure / Pages

1. **Home / Dashboard** — the flip-countdown + status widget, a few featured photos, quick nav.
2. **The Trial (How We Met)** — how you met, dating timeline, proposal story. Photo-driven, chronological.
3. **Pre-Wedding** — engagement shoot, planning chaos, bridal/groom prep, family involvement, countdown leading to the big day.
4. **The Wedding (Dec 13, 2026)** — the main event: ceremony, reception, guest moments. This can go live progressively — a "coming soon" placeholder now, filled in after.
5. **Post-Wedding / Honeymoon** — travels, first weeks as a married couple.
6. **Family Archive** — this is where it becomes a real documentary: stories, old photos, and memories from *both* families across generations, not just your relationship. Could include:
   - A simple family tree component
   - Voice notes or short written stories from parents/grandparents
   - Scanned old photographs with captions
7. **Anniversary Log** — grows every year automatically; each entry = a "renewal," with that year's best photo and a short reflection you write annually.
8. **Guestbook** — wedding guests leave a message/photo (public-facing, moderated).
9. **Terms & Vows** — the fun ToS page described above.
10. **Private/Family-Only Section** *(optional)* — password-gated area for anything you don't want public — more personal letters, unedited family stories.
11. **Upload / Admin** — the in-app upload panel (only visible to the two of you) for adding photos to S3 and tagging them with milestone metadata.

---

## 4. Creative Component Ideas

- **Receipt-style memory cards**: each major memory rendered like a printed receipt/invoice — item name, "price" (a feeling, not a number), date, "thank you for your purchase."
- **Map of Us**: interactive map pinning every place you've traveled together, pins added over time.
- **Growth chart**: a lighthearted line graph (styled like a SaaS metrics dashboard) plotting things like "memories logged per month" or "photos taken" over the relationship — real data if you tag your photos by date.
- **Audio layer**: background ambient audio or a toggleable "our songs" player — a track for each big chapter.
- **Time-lock content**: sections that literally stay locked/blurred until Dec 13, 2026 at the actual ceremony time, then unlock — nice for guests watching the site that day.
- **Two-column "His/Hers" then merging to one column** as the relationship timeline moves from dating → wedding, visually showing two lives becoming one.
- **Family stories as an oral-history archive**: short recorded voice clips (parents/grandparents telling a story about you or about marriage) with a simple audio player and transcript.

---

## 5. Folder Structure (Next.js App Router)

```
us-inc/
├── app/
│   ├── layout.tsx                 # root layout, fonts, footer, nav
│   ├── page.tsx                   # Home / Dashboard
│   ├── how-we-met/page.tsx        # The Trial
│   ├── pre-wedding/page.tsx
│   ├── wedding/page.tsx
│   ├── post-wedding/page.tsx
│   ├── family-archive/page.tsx
│   ├── anniversaries/page.tsx
│   ├── guestbook/page.tsx
│   ├── terms/page.tsx             # Terms & Vows
│   ├── admin/upload/page.tsx      # password-gated upload panel
│   └── api/
│       ├── s3-upload-url/route.ts # returns a presigned PUT URL
│       ├── s3-get-url/route.ts    # returns a presigned GET URL per photo key
│       └── guestbook/route.ts     # POST new guestbook entries
├── components/
│   ├── FlipCountdown.tsx
│   ├── SubscriptionStatusBadge.tsx
│   ├── MemoryReceipt.tsx
│   ├── BillingHistoryList.tsx
│   ├── UptimeStatsBar.tsx
│   ├── MapOfUs.tsx
│   ├── GrowthChart.tsx
│   ├── PhotoUploader.tsx
│   ├── FamilyTree.tsx
│   └── GuestbookForm.tsx
├── content/
│   ├── milestones.json            # billing history / timeline entries
│   ├── family-stories.json
│   └── site-config.ts             # wedding date, anniversary logic, tagline text
├── lib/
│   ├── s3.ts                      # AWS SDK client + presigned URL helpers
│   └── dates.ts                   # trial/subscription/renewal date math
└── public/
    └── favicon (S ♥ H monogram)
```

---

## 6. Flip Countdown Spec

Component: `FlipCountdown.tsx` — a mechanical split-flap display (like old airport boards) counting down to Dec 13, 2026.

- **Units shown**: Days / Hours / Minutes / Seconds, each as its own flip-card group.
- **Digit flip animation**: each digit is a card that flips top-half-down when it changes, revealing the next digit underneath — classic flip-clock CSS animation (achievable with a CSS 3D transform on each digit, no heavy library needed, though `react-flip-countdown` or a small custom hook both work).
- **States** (drive all countdown-dependent UI from one `getSubscriptionStatus()` helper in `lib/dates.ts`):
  - `trial` — now < Dec 13, 2026 → flip counter counts down to wedding, label: *"Trial ends in..."*
  - `active` — Dec 13, 2026 ≤ now < next anniversary → label: *"Subscribed since Dec 13, 2026"*, small flip counter optionally counts down to the *next* renewal instead.
  - On each Dec 13, the "next renewal" target date auto-increments by one year — no manual updates needed, ever.
- **Data**: no backend needed — pure `Date` math against a constant `WEDDING_DATE = new Date("2026-12-13T00:00:00")` in `content/site-config.ts`.

---

## 7. Data Model (content/milestones.json)

```json
[
  {
    "id": "INV-0001",
    "date": "2023-02-14",
    "title": "First Date",
    "category": "trial",
    "description": "Paid in full, no refunds requested.",
    "photoKeys": ["milestones/inv-0001-1.jpg"]
  },
  {
    "id": "INV-0004",
    "date": "2026-12-13",
    "title": "Wedding Day",
    "category": "wedding",
    "description": "Plan upgraded to Married. Auto-renew: ON.",
    "photoKeys": ["wedding/ceremony-1.jpg", "wedding/reception-1.jpg"]
  }
]
```

- `category` drives which page section a milestone appears in: `trial | pre-wedding | wedding | post-wedding | anniversary | family`.
- `photoKeys` are S3 object keys, not URLs — the app resolves each key to a signed URL at render time (see Section 9).
- `family-stories.json` follows a similar shape with fields like `personName`, `relation`, `storyText`, `audioKey`.

---

## 8. Key Component Props (for Cursor to scaffold quickly)

```ts
// MemoryReceipt.tsx
type MemoryReceiptProps = {
  invoiceId: string;      // "INV-0001"
  date: string;
  title: string;
  amountLabel?: string;   // default "Priceless"
  description: string;
  photoUrls: string[];
};

// SubscriptionStatusBadge.tsx
type SubscriptionStatusBadgeProps = {
  status: "trial" | "active";
  targetDate: Date;       // wedding date or next renewal date
};

// PhotoUploader.tsx
type PhotoUploaderProps = {
  category: "trial" | "pre-wedding" | "wedding" | "post-wedding" | "family";
  onUploadComplete: (s3Key: string) => void;
};
```

---

## 9. AWS S3 Integration

- **Bucket**: `our-life`
- **Region**: `ap-southeast-2` (Asia Pacific — Sydney)
- **Bucket setup** (bucket doesn't exist yet — create it before running the app):
  1. Create the bucket:
     ```
     aws s3api create-bucket --bucket our-life --region ap-southeast-2 \
       --create-bucket-configuration LocationConstraint=ap-southeast-2
     ```
  2. Keep it private — block all public access (default for new buckets, but confirm explicitly):
     ```
     aws s3api put-public-access-block --bucket our-life --public-access-block-configuration \
       BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true
     ```
  3. Add CORS so the browser can upload directly via presigned URLs — save as `cors.json`:
     ```json
     {
       "CORSRules": [
         {
           "AllowedOrigins": ["http://localhost:3000", "https://your-vercel-domain.vercel.app"],
           "AllowedMethods": ["GET", "PUT"],
           "AllowedHeaders": ["*"],
           "ExposeHeaders": ["ETag"],
           "MaxAgeSeconds": 3000
         }
       ]
     }
     ```
     then apply it:
     ```
     aws s3api put-bucket-cors --bucket our-life --cors-configuration file://cors.json
     ```
  4. Create an IAM user (or role) scoped to just this bucket (`s3:PutObject`, `s3:GetObject` on `arn:aws:s3:::our-life/*`) and use its access key/secret for the env vars below — avoid using root/admin AWS credentials in the app.
- **Access model**: private bucket, no public read — the app generates **presigned URLs** for both uploads and views.
- **Upload flow**:
  1. `PhotoUploader.tsx` asks `POST /api/s3-upload-url` for a presigned PUT URL (server route uses AWS SDK v3 `@aws-sdk/client-s3` + `@aws-sdk/s3-request-presigner`).
  2. Browser uploads the file directly to S3 using that URL (no file passes through your server).
  3. On success, the S3 object key gets saved into the matching entry in `milestones.json` (or a small database — see note below).
- **View flow**: every page that renders photos calls `GET /api/s3-get-url?key=...` to resolve a short-lived signed URL per image at request/render time — never store or hardcode raw S3 URLs, since the bucket is private.
- **Suggested key prefixes**: `trial/`, `pre-wedding/`, `wedding/`, `post-wedding/`, `family/`, `anniversaries/` — keeps the bucket organized and matches the `category` field in your data model.
- **Env vars needed** (`.env.local`, never commit):
  ```
  AWS_REGION=ap-southeast-2
  AWS_S3_BUCKET=our-life
  AWS_ACCESS_KEY_ID=...
  AWS_SECRET_ACCESS_KEY=...
  ```
- **CORS on the bucket**: must allow `PUT` and `GET` from your Vercel domain (and `http://localhost:3000` during development) for direct browser uploads to work.
- **Note**: the bucket needs to be created before first run — follow the setup steps above. Once created, updating `milestones.json` after every upload means either (a) editing/committing it manually as you go — fine for a slow-growing personal archive, or (b) swapping it for a tiny database (e.g. Vercel Postgres or a single DynamoDB table) once you want the upload panel to write entries automatically. Start with (a); it's zero extra infrastructure.

---

## 10. Design Tokens (starting point — Tailwind config)

A "quiet SaaS dashboard" look — clean, a little corporate, warmed up with photography and a soft accent color rather than typical startup blue:

- **Font**: a clean grotesk sans for UI/labels (e.g. Inter or Geist — Geist pairs naturally with Vercel/Next.js) + a warm serif for milestone titles/captions (e.g. Fraunces or Newsreader) to keep the documentary feel from getting too corporate.
- **Color palette**:
  - Background: near-white `#FAF9F6` (light) — avoid pure white, keep it warm.
  - Ink/text: deep charcoal `#1F1B16`, not pure black.
  - Accent (the "brand" color, used sparingly — status badges, links, the heart in the logo): a warm rose/terracotta, e.g. `#C1553A` or a deep rose `#B3435C` — ties to the heart-monogram.
  - Success/"active subscription" green: muted sage `#5C7A5C`, not neon.
  - Card/surface: soft off-white `#F2EFE9` with a 1px hairline border, subtle shadow — dashboard-card feel.
- **Corners/shadows**: rounded-lg (8–12px) cards, soft low-opacity shadows — avoid harsh drop shadows to keep the warm/personal tone.
- **Spacing/rhythm**: generous whitespace, photo-forward layouts — let images breathe rather than cramming dashboard widgets edge-to-edge.

---

## 11. Sample Copy (to set the tone)

- Hero line: *"Started as a free trial. Upgraded for life. No cancellations, no refunds — just renewals, every single year."*
- Countdown label: *"Your trial ends in..."* → flips to *"Subscribed since Dec 13, 2026"*
- Empty state (before wedding content exists): *"This feature unlocks Dec 13, 2026. Thank you for your patience — our engineering team (the two of us) is working hard."*
- Anniversary section intro: *"Auto-renews every Dec 13. Cancel anytime — except we won't."*

---

## 12. Suggested Build Order

1. Next.js scaffold + Tailwind + `lib/dates.ts` + `FlipCountdown.tsx` on the homepage — the signature piece.
2. S3 wiring: `lib/s3.ts`, the two API routes, and `PhotoUploader.tsx` on a bare `/admin/upload` page — get uploads working end to end early.
3. "How We Met" timeline with `MemoryReceipt.tsx`, pulling from `milestones.json`.
4. Terms & Vows page (fun to write, low effort to build).
5. Family Archive section — start collecting stories/photos from parents now, before the wedding rush.
6. Guestbook (have it ready before Dec 13 so guests can use it at the wedding).
7. Wedding day + Post-wedding pages — fill in after Dec 13, 2026.
8. Anniversary Log — first entry goes live Dec 13, 2027.

---

*This spec is written to be pasted directly into Cursor as a project brief — it includes the stack, folder structure, data model, component prop shapes, and S3 integration details needed to scaffold a working app.*
