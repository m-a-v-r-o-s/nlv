# Στεφανίδης ΑΕ: car dealership & import site

Premium car dealership and car-import site for **Στεφανίδης ΑΕ** (Αθήνα, Αττική).
Next.js 16 (App Router) · TypeScript · Tailwind. Mobile-first, conversion-focused.

> **Demo build.** The brand, the contact details and the whole stock list are
> placeholders. See [Placeholder data](#placeholder-data--swap-before-launch) for
> everything that has to be swapped before this goes live.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start
```

## What's inside

| Route | What it is |
|---|---|
| `/` | Cinematic homepage: hero, stock rail, service pillars, import, handover band |
| `/inventory` | Self-hosted stock list with live filters (μάρκα, αμάξωμα) + sorting |
| `/inventory/[slug]` | Car detail: specs, highlights, sticky action card, import cross-sell |
| `/import` | Εισαγωγή service: cost breakdown, registration-tax table, lead-capture form |
| `/privacy` | Legal placeholder |

Both languages (ΕΛ / EN) are served from the same components. A cookie picks the
language, the server reads it in `src/lib/lang.ts`, and every page selects its copy
with `pick(lang, greek, english)`.

## Design system

`tailwind.config.ts` + `src/app/globals.css`.

- **Base** near-black `#0B0B0D` (cinematic).
- **Gold** `#C6A15B` is the premium/marque accent, and the brand colour.
- **Corsa red** `#B01E28` is now used only for "reserved"/"sold" status badges.
- **Type**: Fraunces (display), Inter (body), JetBrains Mono (data/spec clusters).
  Loaded via `<link>` in `layout.tsx` (runtime, not build) so offline builds stay clean.
- **Brand mark**: `src/components/Wordmark.tsx`. Purely typographic, no glyph, so
  there's no logo bitmap to maintain. The favicon (`src/app/icon.svg`) is a drawn Σ
  monogram in the same gold.

## Photography

All imagery is free stock from [Unsplash](https://unsplash.com), pre-optimized to WebP
and committed under `src/components/`:

| File | Used on |
|---|---|
| `hero.webp` | homepage hero |
| `interior.webp` | homepage import section |
| `handover.webp` | homepage handover band |
| `transport.webp` | `/import` |

Car listings themselves use `<CarArt>`, generated SVG stage art tinted per car, rather
than photos, so no listing is illustrated with a stock photo of a different vehicle. When
real photography lands, drop an `<Image>` in place of `<CarArt>`; the aspect box is
identical, so there's no layout change.

## Placeholder data: swap before launch

- **Brand** → `src/lib/site.ts`. Name, tagline, address, phone, email, nav.
  The phone (`210 000 0000`) and email (`hello@example.com`) are deliberately
  non-routable placeholders.
- **Cars** → `src/lib/cars.ts`. Every listing is invented. Append the real stock here;
  each car is one typed object.
- **Legal** → `/privacy` is a stub; GDPR, terms of sale and the cookie policy still
  need real text.

## Integration points (wired as stubs, marked in code)

- **Import / lead form**: `ImportRequest.tsx` → `submit()`. Point at CRM / email.
- **myDATA (ΑΑΔΕ)**: invoicing hook goes alongside whatever payment flow gets added.

## AI assistant

`src/components/Assistant.tsx` + `src/app/api/chat/route.ts`, backed by
`src/lib/assistant.ts`. The system prompt is generated from the same `cars.ts` and
`site.ts` data the pages render, so the bot can't drift from the site. Needs
`ANTHROPIC_API_KEY` (see `.env.example`); without it the widget shows a friendly
offline message pointing at the phone and email.

## Notes

- `next.config.mjs` sets `images.unoptimized`, so all images ship as pre-optimized local WebP.
- Fully responsive, keyboard-focusable, respects `prefers-reduced-motion`.
