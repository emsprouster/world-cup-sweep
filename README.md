# WC2026 Sweep · Studio Odea

Office sweepstakes tracker for the 2026 FIFA World Cup. Each of the four staff members is assigned one team per group (12 total). Click any team to mark them eliminated — changes sync in real time across all devices via Vercel KV.

---

## Stack

- **React + Vite** — frontend
- **Vercel Serverless Functions** — two API routes (`/api/eliminations`, `/api/toggle`)
- **Vercel KV** (Redis) — shared elimination state

---

## Setup

### 1. Create the GitHub repo

```bash
cd world-cup-sweep
git init
git add .
git commit -m "init"
# Create a new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/world-cup-sweep.git
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repo
3. Framework preset will auto-detect as **Vite** — leave all defaults
4. Click **Deploy** (it will fail on the first deploy — that's expected, KV isn't connected yet)

### 3. Add Vercel KV

1. In your Vercel project dashboard, go to **Storage** tab
2. Click **Create Database** → choose **KV**
3. Name it anything (e.g. `sweep-kv`), choose the free tier
4. Once created, click **Connect to Project** and select your project
5. Vercel will automatically add the required environment variables (`KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `KV_REST_API_READ_ONLY_TOKEN`)

### 4. Redeploy

After connecting KV, trigger a new deployment:
- Either push any change to GitHub, or
- In Vercel dashboard → **Deployments** → click the three dots on the latest → **Redeploy**

Your app will be live at `https://world-cup-sweep.vercel.app` (or similar).

---

## Local development

```bash
npm install
npx vercel login
npx vercel link        # link to your Vercel project
npx vercel env pull    # pulls KV env vars into .env.local
npx vercel dev         # runs Vite + API routes locally
```

---

## Customising the draw

The team assignments are fixed in `src/data.js` via the `seededOrder` array. Each row is a group, each column maps to `[Em, Mike, Shannon, Saxon]` by index. Edit those indices if you want to re-run the draw.

---

## Typography note

The app uses `Georgia, serif` as a placeholder for FreightText Pro. To use FreightText Pro, add your `@font-face` declaration at the top of `src/App.css` and update the `--serif` variable.
