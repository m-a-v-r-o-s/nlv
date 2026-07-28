import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { CarCard } from "@/components/CarCard";
import { CarLogos } from "@/components/CarLogos";
import { featuredCars } from "@/lib/cars";
import { site } from "@/lib/site";
import { getLang } from "@/lib/lang";
import { pick } from "@/lib/i18n";
import heroImg from "@/components/hero.webp";
import interiorImg from "@/components/interior.webp";
import handoverImg from "@/components/handover.webp";

export default async function Home() {
  const lang = await getLang();
  const featured = featuredCars().slice(0, 3);

  const stats: [string, string, string][] = [
    [pick(lang, "Εισαγμένα", "Imported"), "70+", pick(lang, "οχήματα διαθέσιμα", "cars available")],
    [pick(lang, "Εισαγωγή", "Import"), "2–3", pick(lang, "εβδομάδες ως την πινακίδα", "weeks to the plates")],
    [pick(lang, "Έλεγχος", "Inspection"), "100%", pick(lang, "πριν μπουν στη μάντρα", "before they go on sale")],
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
        "Tell us what you're after. We find it, inspect it and give you the full cost to your door."
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

        <div className="shell relative z-10 pb-10 pt-32 md:pb-14">
          <Reveal>
            <h1 className="max-w-4xl font-display text-[clamp(3rem,9vw,7rem)] font-medium leading-[0.92] tracking-tight text-bone">
              {/* Two forced lines so the gold phrase never orphans a word. */}
              <span className="block">
                {pick(lang, "Από την Ευρώπη,", "From Europe,")}
              </span>
              <span className="block">
                <span className="italic text-gold">
                  {pick(lang, "στα χέρια σου", "into your hands")}
                </span>
                .
              </span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-bone/80">
              {pick(
                lang,
                "Επιλεγμένα premium αυτοκίνητα, έτοιμα για παράδοση, και εισαγωγή του οχήματος που ψάχνεις κατά παραγγελία, από την αναζήτηση ως την ελληνική πινακίδα.",
                "Selected premium cars, ready for delivery, plus import to order of the car you're after — from the search all the way to Greek plates."
              )}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/inventory" className="btn-gold">
                {pick(lang, "Δες τα εισαγμένα αυτοκίνητα", "See imported cars")}
              </Link>
              <Link href="/import" className="btn-ghost">
                {pick(lang, "Ζήτησε εισαγωγή", "Request an import")}
              </Link>
            </div>
          </Reveal>

          <Reveal delay={320}>
            <dl className="mt-14 grid max-w-2xl grid-cols-3 gap-6 border-t border-line/60 pt-8">
              {stats.map(([k, v, sub]) => (
                <div key={k}>
                  <dt className="eyebrow-mute">{k}</dt>
                  <dd className="mt-2 font-display text-3xl text-bone md:text-4xl">
                    {v}
                  </dd>
                  <p className="mt-1 text-[12px] text-faint">{sub}</p>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* ── BRAND TICKER (inside hero) ─────────────────────── */}
        <div className="relative z-10 mt-10">
          <CarLogos />
        </div>
      </section>

      {/* ── FEATURED STOCK ───────────────────────────────────── */}
      <section className="shell py-20 md:py-28">
        <Reveal className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">{pick(lang, "Στη μάντρα τώρα", "In the showroom now")}</p>
            <h2 className="mt-3 max-w-lg font-display text-4xl leading-tight text-bone md:text-5xl">
              {pick(lang, "Τρία που αξίζει να δεις ", "Three worth seeing ")}
              <span className="italic text-gold">
                {pick(lang, "από κοντά", "up close")}
              </span>
              .
            </h2>
          </div>
          <Link
            href="/inventory"
            className="hidden shrink-0 font-mono text-[12px] uppercase tracking-widest2 text-gold hover:text-goldsoft md:block"
          >
            {pick(lang, "Όλα τα εισαγμένα αυτοκίνητα", "All imported cars")} →
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featured.map((car, i) => (
            <Reveal key={car.slug} delay={i * 90}>
              <CarCard car={car} lang={lang} />
            </Reveal>
          ))}
        </div>

        <Link href="/inventory" className="btn-ghost mt-10 w-full md:hidden">
          {pick(lang, "Όλα τα εισαγμένα αυτοκίνητα", "All imported cars")} →
        </Link>
      </section>

      {/* ── PILLARS ──────────────────────────────────────────── */}
      <section className="border-y border-line bg-carbon">
        <div className="shell py-20 md:py-28">
          <Reveal>
            <p className="eyebrow">{pick(lang, "Τι κάνουμε", "What we do")}</p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl leading-tight text-bone md:text-5xl">
              {pick(lang, "Ένας συνεργάτης, από την ", "One partner, from the ")}
              <span className="italic text-gold">
                {pick(lang, "αναζήτηση", "search")}
              </span>
              {pick(lang, " ως την πινακίδα.", " to the plates.")}
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.n} delay={i * 90} className="bg-carbon">
                <Link
                  href={p.href}
                  className="group flex h-full flex-col p-8 transition-colors hover:bg-smoke"
                >
                  <span className="font-mono text-[12px] tracking-widest2 text-faint">
                    · {p.n}
                  </span>
                  <h3 className="mt-6 font-display text-2xl text-bone">{p.t}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-mute">
                    {p.d}
                  </p>
                  <span className="mt-8 font-mono text-[12px] uppercase tracking-widest2 text-gold transition-transform duration-500 ease-lux group-hover:translate-x-1">
                    {p.cta} →
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMPORT ───────────────────────────────────────────── */}
      <section className="shell py-20 md:py-28">
        <div className="grid gap-14 md:grid-cols-[1fr_1.1fr] md:gap-20">
          <Reveal>
            <p className="eyebrow">{pick(lang, "Εισαγωγή αυτοκινήτου", "Car import")}</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-bone md:text-5xl">
              {pick(lang, "Δεν το έχουμε; ", "Don't have it? ")}
              <span className="italic text-gold">
                {pick(lang, "Θα το βρούμε.", "We'll find it.")}
              </span>
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
            <div className="relative mt-10 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line">
              <Image
                src={interiorImg}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <ol className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
              {importSteps.map(([t, d], i) => (
                <li key={t} className="bg-carbon p-7">
                  <span className="font-mono text-[12px] tracking-widest2 text-gold">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-xl text-bone">{t}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-mute">{d}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* ── HANDOVER / VISIT ─────────────────────────────────── */}
      <section className="border-t border-line bg-carbon">
        <div className="shell grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
          <Reveal>
            <p className="eyebrow">{pick(lang, "Η παράδοση", "The handover")}</p>
            <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,4rem)] leading-[0.95] text-bone">
              {pick(lang, "Φεύγεις με τα ", "You leave with the ")}
              <span className="italic text-gold">
                {pick(lang, "κλειδιά στο χέρι", "keys in hand")}
              </span>
              .
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-mute">
              {pick(
                lang,
                "Ελληνική πινακίδα, ΚΤΕΟ και όλα τα χαρτιά τακτοποιημένα πριν σου δώσουμε το κλειδί. Έλα να το δεις από κοντά ή πάρε μας τηλέφωνο.",
                "Greek plates, MOT and all the paperwork sorted before we hand you the key. Come see it in person, or just give us a call."
              )}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href={`tel:${site.phoneHref}`} className="btn-gold">
                {pick(lang, "Κάλεσε", "Call")} {site.phone}
              </a>
              <a href={`mailto:${site.email}`} className="btn-ghost">
                {pick(lang, "Στείλε email", "Email us")}
              </a>
            </div>
            <p className="mt-6 spec normal-case tracking-normal">
              {site.address.street} · {site.address.area} {site.address.postal}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line">
              <Image
                src={handoverImg}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 560px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
