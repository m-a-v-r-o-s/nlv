# Next Level Vision — nlv.gr rebuild

Premium car dealership site for **Next Level Vision / #BANDITO** (Βάρη, Αττική).
Next.js 14 (App Router) · TypeScript · Tailwind. Mobile-first, conversion-focused.

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
| `/` | Cinematic homepage — hero, stock rail, service pillars, φιόγκος band, import, video/social |
| `/inventory` | Self-hosted inventory with live filters (μάρκα, αμάξωμα) + sorting. **No car.gr embed.** |
| `/inventory/[slug]` | Car detail — specs, highlights, sticky action card, φιόγκος cross-sell |
| `/import` | Εισαγωγή service + lead-capture request form |
| `/bow4car` | Bow4Car landing (rent vs buy) + product grid |
| `/bow4car/[slug]` | **Full rent/buy checkout** — mode toggle, colour, rental dates, delivery/return/pickup, live totals |
| `/privacy` | Legal placeholder |

## Design system

`tailwind.config.ts` + `src/app/globals.css`.

- **Base** near-black `#0B0B0D` (cinematic).
- **Gold** `#C6A15B` — the premium/marque accent.
- **Corsa red** `#B01E28` — reserved for the φιόγκος / gifting world, so the two accents carry meaning.
- **Type** — Fraunces (display), Inter (body), JetBrains Mono (data/spec clusters).
  Loaded via `<link>` in `layout.tsx` (runtime, not build) so offline builds stay clean.
- **Signature** — the bow rosette (`BowMark`) recurs as brand mark → product art, and
  the "tie the bow" gifting checkout.

## Data — drops in later

- **Cars** → `src/lib/cars.ts`. Seeded with the 7 cars from the current car.gr screenshot.
  Append the full stock list here; each car is one typed object. Real photography: replace
  `<CarArt>` with `<Image>` — the aspect box is identical, no layout change.
- **Bows** → `src/lib/bows.ts`. Products, colours, and the shipping matrix
  (Αττική / Ηπειρωτική / Νησιά / Παραλαβή-Βάρη).

## Checkout economics (`src/lib/bows.ts` + `BowCheckout.tsx`)

- **Buy** = buyPrice + shipping.
- **Rent** = rentPerDay × days + shipping **+ return leg** + refundable deposit.
  Pickup at Βάρη = free both legs and no return charge.
- Deposit is shown separately and flagged as refundable.

## Integration points (wired as stubs, marked in code)

- **Stripe** — `BowCheckout.tsx` → `submit()`. Replace the inline confirmation with a
  `POST /api/checkout` that creates a Checkout Session (hold the rental deposit as a
  separate authorised amount) and redirects to `session.url`.
- **Import / lead form** — `ImportRequest.tsx` → `submit()`. Point at CRM / email / the
  Telegram bot.
- **myDATA (ΑΑΔΕ)** — on successful Stripe payment, fire the invoice to myDATA
  (webhook → REST, or via Elorus/Workadu). Hook lives alongside the Stripe handler.

## Brand config

`src/lib/site.ts` — address, phone, email, socials (IG/TikTok/YouTube/Telegram/FB), nav.

## Notes

- `next.config.mjs` sets `images.unoptimized` (fine until real photos + a loader are added).
- Fully responsive, keyboard-focusable, respects `prefers-reduced-motion`.
