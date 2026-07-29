import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { CarCard } from "@/components/CarCard";
import { CarLogos } from "@/components/CarLogos";
import { cars, featuredCars } from "@/lib/cars";
import { site } from "@/lib/site";
import { getLang } from "@/lib/lang";
import { pick } from "@/lib/i18n";
import heroImg from "@/components/hero.webp";
import interiorImg from "@/components/interior.webp";
import handoverImg from "@/components/handover.webp";

export default async function Home() {
  const lang = await getLang();
  const featured = featuredCars().slice(0, 3);

  // Three verifiable facts, not a proof bar. The stock figure counts the cars
  // that are actually available, so it can never drift from the listing page
  // as stock is sold or reserved.
  const available = cars.filter((c) => c.status === "available").length;

  const facts: [string, string, string][] = [
    [
      pick(lang, "Στη μάντρα", "In the showroom"),
      String(available),
      pick(lang, "οχήματα έτοιμα για παράδοση", "cars ready for delivery"),
    ],
    [
      pick(lang, "Εισαγωγή", "Import"),
      "2-3",
      pick(lang, "εβδομάδες ως την πινακίδα", "weeks to the plates"),
    ],
    [
      pick(lang, "Βάση", "Based in"),
      pick(lang, "Αθήνα", "Athens"),
      pick(lang, "παράδοση σε όλη την Ελλάδα", "delivery across Greece"),
    ],
  ];

  const pillars = [
    {
      n: "01",
      t: pick(lang, "Εισαγμένα αυτοκίνητα", "Imported cars"),
      d: pick(
        lang,
        "Επιλεγμένα οχήματα, ελεγμένα και έτοιμα για παράδοση. Από city υβριδικά μέχρι supercars.",
        "Selected cars, inspected and ready for delivery. From city hybrids to supercars."
      ),
      href: "/inventory",
      cta: pick(lang, "Δες τα αυτοκίνητα", "See imported cars"),
    },
    {
      n: "02",
      t: pick(lang, "Νέα εισαγωγή", "New import"),
      d: pick(
        lang,
        "Πες μας τι ψάχνεις. Το βρίσκουμε, το ελέγχουμε και σου δίνουμε πλήρες κόστος στην πόρτα σου.",
        "Tell us what you’re after. We find it, inspect it and give you the full cost to your door."
      ),
      href: "/import",
      cta: pick(lang, "Πώς δουλεύει", "How it works"),
    },
    {
      n: "03",
      t: pick(lang, "Χαρτιά & ταξινόμηση", "Paperwork & plates"),
      d: pick(
        lang,
        "Εκτελωνισμός, τέλος ταξινόμησης, ΚΤΕΟ και ελληνική πινακίδα. Τα αναλαμβάνουμε όλα εμείς.",
        "Customs, registration tax, MOT and Greek plates. We take care of all of it."
      ),
      href: "/import#request",
      cta: pick(lang, "Ρώτησέ μας", "Ask us"),
    },
  ];

  const importSteps: [string, string][] = [
    [pick(lang, "Πες μας τι θες", "Tell us what you want"), pick(lang, "Μάρκα, μοντέλο, budget, εξοπλισμός.", "Make, model, budget, options.")],
    [pick(lang, "Αναζήτηση & έλεγχος", "Search & inspection"), pick(lang, "Εντοπίζουμε και ελέγχουμε το όχημα στην πηγή.", "We locate and inspect the car at the source.")],
    [pick(lang, "Πλήρες κόστος", "Full cost"), pick(lang, "Τιμή, μεταφορά, τέλη, όλα στην πόρτα σου.", "Price, transport, taxes, all to your door.")],
    [pick(lang, "Παράδοση", "Handover"), pick(lang, "Με ελληνική πινακίδα, στην Αθήνα ή όπου εσύ.", "On Greek plates, in Athens or wherever you are.")],
  ];

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="grain relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroImg}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />
        </div>

        <div className="shell relative z-raised pb-10 pt-32 md:pb-14">
          {/* The one orchestrated entrance on the site. Everything below the
              fold is simply there when you arrive at it. */}
          <Reveal>
            <h1 className="max-w-4xl font-display text-[clamp(3rem,9vw,7rem)] font-medium leading-[0.92] tracking-tight text-bone">
              <span className="block">
                {pick(lang, "Από την Ευρώπη,", "From Europe,")}
              </span>
              <span className="block">
                <span className="mark">
                  {pick(lang, "στα χέρια σου", "into your hands")}
                </span>
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-bone/80">
              {pick(
                lang,
                "Επιλεγμένα premium αυτοκίνητα, έτοιμα για παράδοση, και εισαγωγή του οχήματος που ψάχνεις κατά παραγγελία, από την αναζήτηση ως την ελληνική πινακίδα.",
                "Selected premium cars, ready for delivery, plus import to order of the car you’re after. From the search all the way to Greek plates."
              )}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/inventory" className="btn-gold">
                {pick(lang, "Δες τα αυτοκίνητα", "See the cars")}
              </Link>
              <Link href="/import" className="btn-ghost">
                {pick(lang, "Ζήτησε εισαγωγή", "Request an import")}
              </Link>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <dl className="mt-14 grid max-w-2xl grid-cols-1 gap-6 border-t border-line/60 pt-8 sm:grid-cols-3">
              {facts.map(([k, v, sub]) => (
                <div key={k}>
                  <dt className="font-mono text-[11px] uppercase tracking-widest2 text-faint">
                    {k}
                  </dt>
                  <dd className="num mt-2 font-display text-3xl text-bone md:text-4xl">
                    {v}
                  </dd>
                  <p className="mt-1 text-[12px] text-faint">{sub}</p>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* ── BRAND TICKER (inside hero) ─────────────────────── */}
        <div className="relative z-raised mt-10">
          <CarLogos lang={lang} />
        </div>
      </section>

      {/* ── FEATURED STOCK ───────────────────────────────────── */}
      <section className="shell py-20 md:py-28">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-lg font-display text-4xl leading-tight text-bone md:text-5xl">
            {pick(lang, "Τρία που αξίζει να δεις από κοντά.", "Three worth seeing up close.")}
          </h2>
          <Link
            href="/inventory"
            className="hidden shrink-0 whitespace-nowrap border-b border-line pb-1 font-mono text-[12px] uppercase tracking-widest2 text-gold transition-colors hover:border-gold md:block"
          >
            {pick(lang, "Όλα τα αυτοκίνητα", "All cars")}
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featured.map((car) => (
            <CarCard key={car.slug} car={car} lang={lang} />
          ))}
        </div>

        <Link href="/inventory" className="btn-ghost mt-10 w-full md:hidden">
          {pick(lang, "Όλα τα αυτοκίνητα", "All cars")}
        </Link>
      </section>

      {/* ── WHAT WE DO ───────────────────────────────────────────
          An index of the three services, set as hairline-ruled rows rather
          than a three-up card grid: it reads as a directory, which is what it
          is, and it lets the rows breathe at different content lengths. */}
      <section className="border-y border-line bg-carbon">
        <div className="shell py-24 md:py-36">
          <h2 className="max-w-2xl font-display text-4xl leading-tight text-bone md:text-5xl">
            {pick(
              lang,
              "Ένας συνεργάτης, από την αναζήτηση ως την πινακίδα.",
              "One partner, from the search to the plates."
            )}
          </h2>

          <div className="mt-16 border-t border-line">
            {pillars.map((p) => (
              <Link
                key={p.n}
                href={p.href}
                className="group grid gap-x-6 border-b border-line py-8 transition-colors hover:bg-smoke/40 sm:grid-cols-[3rem_minmax(0,1fr)] md:py-10"
              >
                <span className="num font-mono text-[12px] tracking-widest2 text-faint">
                  {p.n}
                </span>
                <div>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
                    <h3 className="font-display text-2xl text-bone md:text-3xl">
                      {p.t}
                    </h3>
                    <span className="whitespace-nowrap font-mono text-[12px] uppercase tracking-widest2 text-gold">
                      {p.cta}
                    </span>
                  </div>
                  <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-mute">
                    {p.d}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMPORT ───────────────────────────────────────────── */}
      <section className="shell py-16 md:py-24">
        <div className="grid gap-14 md:grid-cols-[1fr_1.1fr] md:gap-20">
          <div>
            <h2 className="font-display text-4xl leading-tight text-bone md:text-5xl">
              {pick(lang, "Δεν το έχουμε; Θα το βρούμε.", "Don’t have it? We’ll find it.")}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-mute">
              {pick(
                lang,
                "Πες μας μάρκα, μοντέλο και εξοπλισμό. Αναλαμβάνουμε αναζήτηση, έλεγχο, μεταφορά και τελωνειακά, και σου παρουσιάζουμε πλήρες κόστος πριν προχωρήσεις.",
                "Tell us the make, model and options. We handle the search, inspection, transport and customs, and present the full cost before you commit."
              )}
            </p>
            <Link href="/import" className="btn-gold mt-9">
              {pick(lang, "Ξεκίνα την αναζήτηση", "Start the search")}
            </Link>
            <div className="relative mt-12 aspect-[4/3] w-full overflow-hidden border border-line">
              <Image
                src={interiorImg}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover"
              />
            </div>
          </div>

          <ol className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
            {importSteps.map(([t, d], i) => (
              <li key={t} className="bg-carbon p-7">
                <span className="num font-mono text-[12px] tracking-widest2 text-gold">
                  0{i + 1}
                </span>
                <h3 className="mt-4 font-display text-xl text-bone">{t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-mute">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── HANDOVER / VISIT ─────────────────────────────────── */}
      <section className="border-t border-line bg-carbon">
        <div className="shell grid items-center gap-12 py-20 md:grid-cols-2 md:py-32">
          <div>
            <h2 className="font-display text-[clamp(2.5rem,6vw,4rem)] leading-[0.95] text-bone">
              {pick(lang, "Φεύγεις με τα κλειδιά στο χέρι.", "You leave with the keys in hand.")}
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-mute">
              {pick(
                lang,
                "Ελληνική πινακίδα, ΚΤΕΟ και όλα τα χαρτιά τακτοποιημένα πριν σου δώσουμε το κλειδί. Έλα να το δεις από κοντά ή πάρε μας τηλέφωνο.",
                "Greek plates, MOT and all the paperwork sorted before we hand you the key. Come see it in person, or just give us a call."
              )}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href={`tel:${site.phoneHref}`} className="btn-gold num">
                {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="btn-ghost">
                {pick(lang, "Στείλε email", "Email us")}
              </a>
            </div>
            <p className="mt-6 spec normal-case tracking-normal">
              {site.address.street} · {site.address.area} {site.address.postal}
            </p>
          </div>

          <div className="relative aspect-[4/5] w-full overflow-hidden border border-line">
            <Image
              src={handoverImg}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 560px"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
