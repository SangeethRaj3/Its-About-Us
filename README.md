# Its-About-Us

**US, Inc.** — a wedding documentary site disguised as a SaaS subscription dashboard.

Product plan: [`wedding_documentary_app_plan.md`](./wedding_documentary_app_plan.md).

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

By default only the **Trial Ends** flip-countdown page is public. Set `NEXT_PUBLIC_SITE_FULL_RELEASE=true` when the full archive is ready.

## Deploy on Vercel

The Next.js app is at the **repository root** — no Root Directory override needed.

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import **SangeethRaj3/Its-About-Us**
3. Confirm **Framework Preset: Next.js** (defaults are fine)
4. Optional env vars:

   | Name | Value | Notes |
   |------|--------|--------|
   | `NEXT_PUBLIC_SITE_FULL_RELEASE` | `false` | Trial-only landing |
   | `AWS_REGION` | `ap-southeast-2` | When S3 is ready |
   | `AWS_S3_BUCKET` | `our-life` | When S3 is ready |
   | `AWS_ACCESS_KEY_ID` | *(secret)* | IAM key |
   | `AWS_SECRET_ACCESS_KEY` | *(secret)* | IAM secret |

5. Click **Deploy**

### CLI

```bash
npx vercel login
npx vercel --prod
```

After deploy, add your Vercel URL to the S3 bucket CORS `AllowedOrigins` if you use uploads.
