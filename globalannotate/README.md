# GlobalAnnotate

Production-ready marketing website for **GlobalAnnotate** — AI annotation & data
labeling, translation & localization (100+ languages), and digital marketing
services.

> Precision Across Languages. Intelligence Across Data. Growth Across Markets.

---

## Tech stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** for animation (multilingual greeting cycler, word-by-word
  headline reveal, scroll-reveal, animated stat count-up)
- **lucide-react** icons
- **react-hook-form** + **zod** for forms
- Custom display + body font pairing via `next/font`
  (Bricolage Grotesque + Plus Jakarta Sans)
- Imagery via **next/image** hotlinked from Unsplash
  (royalty-free, commercial use, no attribution required).
  All image IDs live in `lib/images.ts` — swap any entry to change the visual.
- Deployable to Vercel with zero config

## Pages

| Route                                  | Purpose                                   |
| -------------------------------------- | ----------------------------------------- |
| `/`                                    | Home                                      |
| `/services`                            | Services overview + anchor links          |
| `/services/translation-localization`   | Translation & Localization detail         |
| `/services/ai-annotation`              | AI Annotation & Data Labeling detail      |
| `/services/digital-marketing`          | Digital Marketing detail                  |
| `/portfolio`                           | Case studies                              |
| `/reviews`                             | Client reviews + "Leave a Review" form    |
| `/about`                               | Company story, mission, values            |
| `/contact`                             | Contact + "Get a Quote / Order" form      |
| `*` (anything else)                    | Polished 404 page                         |

A `sitemap.xml` and `robots.txt` are generated automatically from
`app/sitemap.ts` and `app/robots.ts`.

## Running locally

```bash
npm install
npm run dev
# open http://localhost:3000
```

To build for production:

```bash
npm run build
npm run start
```

## Form submissions (Formspree)

Both the **Get a Quote** form (`/contact`) and the **Leave a Review** form
(`/reviews`) submit via [Formspree](https://formspree.io) — no backend or
email server is required from this codebase.

1. Sign up for a free Formspree account.
2. Create **two forms** in Formspree (one for quotes, one for reviews).
3. Copy each form's endpoint URL (it looks like `https://formspree.io/f/abcdwxyz`).
4. Copy `.env.local.example` to `.env.local` and paste the endpoints in:

   ```bash
   cp .env.local.example .env.local
   ```

   ```env
   NEXT_PUBLIC_FORMSPREE_QUOTE_ENDPOINT=https://formspree.io/f/your-quote-id
   NEXT_PUBLIC_FORMSPREE_REVIEW_ENDPOINT=https://formspree.io/f/your-review-id
   ```

5. In Formspree, configure each form's **delivery address** — that's the inbox
   that actually receives submissions. You can point it at a personal Gmail
   while `info@globalannotate.com` is being set up, then switch it later. The
   delivery inbox is **never** stored in this codebase.

## Editing site content

- **Reviews on `/reviews`** — `data/reviews.ts`. Each entry has `name`,
  `company`, `country`, `rating` (1–5), `comment`, and `date`. Just add or
  edit entries and redeploy.
- **Service copy** — each service has its own file under `app/services/<slug>/page.tsx`.
  Edit the `included`, `useCases`, `tiers`, and `faq` props passed to `<ServicePage />`.
- **Portfolio case studies** — `app/portfolio/page.tsx`.
- **Public email address** displayed across the site — `lib/site.ts` (`email`).
- **Tagline, social links, nav items** — also in `lib/site.ts`.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Add both `NEXT_PUBLIC_FORMSPREE_*` environment variables in
   **Project Settings → Environment Variables**.
4. Deploy.
5. In **Project Settings → Domains**, add `globalannotate.com` (and
   `www.globalannotate.com`). Vercel will give you DNS records to set at
   your domain registrar. Once DNS propagates, the site is live on your
   custom domain with SSL.

## About custom @globalannotate.com mailboxes

Custom domain mailboxes such as `info@globalannotate.com` are set up
**outside** this codebase, via a mail provider:

- **Google Workspace** (`workspace.google.com`) — paid, the most common choice.
- **Zoho Mail** (`zoho.com/mail`) — has a free tier for small teams.

You'll be asked to add a few DNS records (MX, SPF, DKIM, DMARC) at your
domain registrar. The site code does not depend on this — it only **displays**
`info@globalannotate.com` and lets visitors `mailto:` it. Form delivery
inboxes are configured separately inside Formspree.

## License

© GlobalAnnotate. All rights reserved.
