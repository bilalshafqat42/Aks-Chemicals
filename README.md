# AKS Chemicals

Homepage for AKS Chemicals, built with Next.js 15 (App Router) and TypeScript.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

## Where things live

| What you want to change | File |
|---|---|
| All copy, ranges, contact details, image paths | `lib/content.ts` |
| Colours, type scale, spacing, breakpoints | `app/globals.css` (tokens are at the top, in `:root`) |
| Page order | `app/page.tsx` |
| A single section | `components/<Section>.tsx` |
| Photographs and logo | `public/img/` |
| Fonts | `app/fonts/` + `app/layout.tsx` |

The content model is the point. Add a sixth range by adding one object to
`ranges` in `lib/content.ts` and it appears in the list, in the footer and in
the enquiry form dropdown. Nothing else needs touching.

## Structure

```
app/
  layout.tsx       fonts, metadata, html shell
  page.tsx         section order
  globals.css      the whole design system
  fonts/           Newsreader, Inter, JetBrains Mono (woff2, self-hosted)
components/
  ScrollFX.tsx     the only client component: sticky header + scroll reveals
  ContactForm.tsx  client component, form state
  Shot.tsx         reusable image slot with its Fig. caption
  ...              one file per section
lib/content.ts     every string and every list on the page
public/img/        photographs and the AKS logo
```

## Design notes

- Dark ink canvas with warm bone paper sections. Tokens in `:root`.
- Display face is Newsreader, body is Inter, labels and data are JetBrains Mono.
- Accent `--dye: #C2552B`. Brand navy `--navy: #163464`, taken from the logo.
- Fonts are self-hosted via `next/font/local`, so there is no Google Fonts
  request and no layout shift.
- Scroll reveals are one `IntersectionObserver` adding `.in` to `.rv` elements.
  They are disabled under `prefers-reduced-motion`.

## Before it goes live

1. **Photography.** The four shots in `public/img/` are Unsplash placeholders
   (free licence, commercial use allowed, no attribution required). Replace them
   with AKS's own and update the credit line in `components/SiteFooter.tsx`.
   Keep the ratios: production 21:9, laboratory 4:5, finishing 16:11, plant 4:5.
2. **The enquiry form** currently just prevents default. Point
   `components/ContactForm.tsx` at a route handler, a form service or an email
   API.
3. **Mobile nav.** The burger button is styled but has no menu behind it yet.
4. **Check the facts with the client.** ISO 9001:2008 and the REACH wording came
   off the existing akschemicals.com. Confirm the certification is current before
   publishing.

## Deploy

Deploys to Vercel as-is. Any Node host works with `npm run build && npm start`.
