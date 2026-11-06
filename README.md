# AKS Chemicals

Homepage for AKS Chemicals, built with Next.js 16 (App Router) and TypeScript.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
npm run lint    # ESLint
npm run package # static build zipped for Hostinger: aks-chemicals-website-upload.zip
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
  icon.png         favicon
  page.tsx         section order
  globals.css      the whole design system
  fonts/           Newsreader, Inter, JetBrains Mono (woff2, self-hosted)
components/
  ScrollFX.tsx     client: sticky header + scroll reveals
  MobileMenu.tsx   client: burger button and mobile menu panel
  ContactForm.tsx  client: enquiry form, posts to /contact.php
  Year.tsx         client: keeps the footer year current
  Shot.tsx         reusable image slot with its Fig. caption
  ...              one file per section
lib/content.ts     every string and every list on the page
public/img/        photographs and the AKS logo
public/contact.php emails enquiries (runs on the PHP host)
public/.htaccess   404 page, caching and security headers for Hostinger
```

## Design notes

- Dark ink canvas with warm bone paper sections. Tokens in `:root`.
- Display face is Newsreader, body is Inter, labels and data are JetBrains Mono.
- Accent `--dye: #C2552B`. Brand navy `--navy: #163464`, taken from the logo.
- Fonts are self-hosted via `next/font/local`, so there is no Google Fonts
  request and no layout shift.
- Scroll reveals are one `IntersectionObserver` adding `.in` to `.rv` elements.
  They are disabled under `prefers-reduced-motion`, and only hide content once
  an inline script has added `.js` to `<html>`, so the page is fully readable
  without JavaScript.

## Before it goes live

1. **Enquiry form email.** Set `ENQUIRY_TO` and `ENQUIRY_FROM` at the top of
   `public/contact.php`. `ENQUIRY_FROM` must be a mailbox that exists on the
   domain in Hostinger. Send a test enquiry after every upload.
2. **Confirm the facts with the client.** Search `lib/content.ts` for `CONFIRM`:
   - ISO 9001:2008 was withdrawn in 2018. Update `iso.edition` to the current
     certificate (likely 2015). It flows through the page, footer and figures.
   - The fax number is one digit shorter than the phone numbers.
   - The "one of the world leaders" line in `components/About.tsx`.
3. **Photography.** The four shots in `public/img/` are Unsplash placeholders
   (free licence, commercial use allowed, no attribution required). Replace them
   with AKS's own and update the credit line in `components/SiteFooter.tsx`.
   Keep the ratios: production 21:9, laboratory 4:5, finishing 16:11, plant 4:5.
4. **Favicon.** `app/icon.png` is a simple "AKS" in the logo navy. Swap in the client's
   mark if they have one.

## Hosting (Hostinger): replacing the WordPress site

The site is a static export (`output: "export"` in `next.config.mjs`): plain
HTML, CSS and JS, no Node.js and no environment variables. The form is handled
by `contact.php`, whose two email addresses are set at the top of that file.

`npm run package` builds `out/` and zips it as `aks-chemicals-website-upload.zip`.

### First upload (replaces WordPress)

1. **Back up WordPress.** hPanel > Websites > akschemicals.com > Files > Backups:
   download a files backup and a database backup. Keep them until the new
   site has been live for a few weeks.
2. **Mailbox.** hPanel > Emails: make sure the `ENQUIRY_FROM` mailbox in
   `contact.php` exists (e.g. website@akschemicals.com).
3. **Clear `public_html`.** File Manager > `public_html`: select everything
   (show hidden files so the old `.htaccess` is included) and delete it. This
   removes WordPress files only; the database stays untouched in the backup and
   in hPanel > Databases.
4. **Upload and extract.** Upload `aks-chemicals-website-upload.zip` into
   `public_html`, right-click > Extract, extract into `public_html` itself, then
   delete the zip. `index.html`, `contact.php` and `.htaccess` must sit directly
   in `public_html`, not in a subfolder.
5. **SSL.** hPanel > Security > SSL: make sure it is active.
6. **Check:**
   - https://akschemicals.com loads the new site (hard refresh: Cmd+Shift+R).
   - https://akschemicals.com/contact-us/ jumps to the contact section.
   - Send a test enquiry. Check the inbox and the spam folder.
7. **Search Console** (optional): submit https://akschemicals.com/sitemap.xml.

Once the new site is confirmed, the WordPress database can be deleted in
hPanel > Databases. Do it only after you're sure you don't need the old site.

### Updating later

Change the code, run `npm run package`, upload and extract the new zip over the
old files.

### Notes

- `.htaccess` forces HTTPS on akschemicals.com (no www), serves `index.html`
  even if an old `index.php` is left behind, and 301-redirects the old WordPress
  addresses (`/contact-us/`, `/wp-admin`, old posts and so on) to the new page.
- `npm run dev` has no PHP, so the form shows its error message locally. That
  is expected.
- If enquiries land in spam, check SPF/DKIM for the domain in hPanel > Emails.
