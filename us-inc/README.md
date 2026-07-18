# US, Inc.

A personal wedding documentary site disguised as a SaaS subscription dashboard.

**Tagline:** *The most successful merger of two people, live since 2026*  
**Wedding:** December 13, 2026  
**Stack:** Next.js (App Router) + TypeScript + Tailwind CSS + private AWS S3

## Quick start

```bash
cd us-inc
npm install
cp .env.example .env.local   # fill AWS keys when ready
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

**Default public view:** only the **Trial Ends** flip-calendar landing page (`/`). Other routes redirect home until you set:

```bash
NEXT_PUBLIC_SITE_FULL_RELEASE=true
```

Admin uploads stay at `/admin/upload` for founders.

## What’s included

| Area | Path | Public now? |
|------|------|-------------|
| Trial Ends flip countdown | `/` | Yes |
| Full dashboard + archive pages | `/how-we-met`, … | After full release flag |
| Admin upload | `/admin/upload` | Founders only |

Content lives in `content/` (`milestones.json`, `family-stories.json`, `guestbook.json`, `site-config.ts`).

### S3 metrics layout (counts start at 0)

| Metric | How it’s counted |
|--------|------------------|
| Photos | Objects under `photos/` + chapter folders (`trial/`, `wedding/`, …) |
| Trips | **Folders** under `trips/{trip-slug}/` — one folder per trip |
| Playlists | Folders under `playlists/{id}/` |
| Fights survived | Folders under `fights/{id}/` |
| Days together | Date math from first date (not S3) |

See `lib/stats.ts` and `getArchiveStats()`.

## S3 setup

1. Create private bucket `our-life` in `ap-southeast-2` (see plan §9).
2. Apply CORS for `localhost:3000` and your Vercel domain.
3. IAM user with `s3:PutObject` + `s3:GetObject` on that bucket.
4. Put credentials in `.env.local`.

Upload flow: browser → `POST /api/s3-upload-url` → presigned PUT → S3.  
View flow: `GET /api/s3-get-url?key=...` → short-lived GET URL.

After upload, copy the returned object key into the matching milestone’s `photoKeys`.

## Deploy

Deploy the `us-inc` folder to Vercel and set the same env vars in the project settings. Guestbook writes to `content/guestbook.json` work locally; on Vercel the filesystem is ephemeral — swap to Postgres/Dynamo when you need durable guest messages in production.

## Brand notes

- Monogram: **S ♥ H**
- Footer: *No cancellations. No refunds. Just renewals.*
- Palette: warm off-white, charcoal, rose accent `#B3435C`, sage for “active”
