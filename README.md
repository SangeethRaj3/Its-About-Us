# Its-About-Us

**US, Inc.** — a wedding documentary site disguised as a SaaS subscription dashboard.

The Next.js app lives in **[`us-inc/`](./us-inc/)**.  
Product plan: [`wedding_documentary_app_plan.md`](./wedding_documentary_app_plan.md).

## Quick start

```bash
cd us-inc
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

By default only the **Trial Ends** flip-countdown page is public. Set `NEXT_PUBLIC_SITE_FULL_RELEASE=true` when the full archive is ready.

## Deploy on Vercel

The app is in the **`us-inc`** folder (not the repo root). You must set that as the Root Directory.

### Option A — Dashboard (recommended)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import **SangeethRaj3/Its-About-Us** (connect GitHub if asked)
3. Configure project:
   - **Framework Preset:** Next.js
   - **Root Directory:** `us-inc` ← click *Edit*, select `us-inc`
   - **Build Command:** `npm run build` (default)
   - **Install Command:** `npm install` (default)
4. **Environment Variables** (optional for now — Trial page works without AWS):

   | Name | Value | Notes |
   |------|--------|--------|
   | `NEXT_PUBLIC_SITE_FULL_RELEASE` | `false` | Keep trial-only landing |
   | `AWS_REGION` | `ap-southeast-2` | When S3 is ready |
   | `AWS_S3_BUCKET` | `our-life` | When S3 is ready |
   | `AWS_ACCESS_KEY_ID` | *(secret)* | IAM user key |
   | `AWS_SECRET_ACCESS_KEY` | *(secret)* | IAM user secret |

5. Click **Deploy**
6. After deploy, copy your URL (e.g. `https://its-about-us.vercel.app`) and add it to the S3 bucket CORS `AllowedOrigins` if you use uploads.

### Option B — CLI

```bash
cd us-inc
npx vercel login
npx vercel          # preview
npx vercel --prod   # production
```

When the CLI asks for root / settings, choose the `us-inc` directory (or run commands from inside it).
