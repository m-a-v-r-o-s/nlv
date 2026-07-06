import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { CarCard } from "@/components/CarCard";
import { BowMark } from "@/components/BowMark";
import { CarLogos } from "@/components/CarLogos";
import { featuredCars } from "@/lib/cars";
import { minRent } from "@/lib/bows";
import { bowImages } from "@/lib/bowImages";
import { site } from "@/lib/site";
import { getLang } from "@/lib/lang";
import { pick, fmtEur } from "@/lib/i18n";
import heroImg from "@/components/hero.webp";
import showroomImg from "@/components/showroom.webp";

export default async function Home() {
  const lang = await getLang();
  const featured = featuredCars().slice(0, 3);

  const stats: [string, string, string][] = [
    [pick(lang, "Εισαγμένα", "Imported"), "70+", pick(lang, "οχήματα διαθέσιμα", "cars available")],
    [pick(lang, "Εισαγωγή", "Import"), "4–7", pick(lang, "ημέρες μελέτη κόστους", "days cost study")],
    [pick(lang, "Παρουσίαση", "Presentation"), "Video", pick(lang, "για κάθε όχημα", "for every car")],
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
      t: pick(lang, "Φιόγκος", "The Bow"),
      d: pick(
        lang,
        "Ο φιόγκος που κάνει την παράδοση δώρο. Νοίκιασέ τον για τη στιγμή ή απόκτησέ τον.",
        "The bow that makes a delivery a gift. Rent it for the moment or make it yours."
      ),
      href: "/bow4car",
      cta: pick(lang, "Ο φιόγκος", "The bow"),
    },
  ];

  const importSteps: [string, string][] = [
    [pick(lang, "Πες μας τι θες", "Tell us what you want"), pick(lang, "Μάρκα, μοντέλο, budget, εξοπλισμός.", "Make, model, budget, options.")],
    [pick(lang, "Αναζήτηση & έλεγχος", "Search & inspection"), pick(lang, "Εντοπίζουμε και ελέγχουμε το όχημα στην πηγή.", "We locate and inspect the car at the source.")],
    [pick(lang, "Πλήρες κόστος", "Full cost"), pick(lang, "Τιμή, μεταφορά, τέλη, όλα στην πόρτα σου.", "Price, transport, taxes, all to your door.")],
    [pick(lang, "Παράδοση με φιόγκο", "Delivery with a bow"), pick(lang, "Στη Βάρη ή όπου εσύ. Video παρουσίαση δωρεάν.", "In Vari or wherever you are. Free video presentation.")],
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
              {pick(lang, "Ζήσε ", "Live ")}
              <span className="italic text-gold">Next Level</span>
              {pick(lang, " με τον ", " with ")}
              <span className="text-gold">BaNDiTo</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-bone/80">
              {pick(
                lang,
                "Επιλεγμένα premium αυτοκίνητα, εισαγωγή του οχήματος των ονείρων σου κατά παραγγελία, και ο φιόγκος που μετατρέπει την παράδοση σε στιγμή που δεν ξεχνιέται.",
                "Selected premium cars, the car of your dreams imported to order, and the bow that turns delivery into a moment you never forget."
              )}
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/inventory" className="btn-gold">
                {pick(lang, "Δες τα εισαγμένα αυτοκίνητα", "See imported cars")}
              </Link>
              <Link href="/bow4car" className="btn-ghost">
                <BowMark size={16} color="#B01E28" ribbon="#8A1620" />
                {pick(lang, "Ο φιόγκος", "The bow")}
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
              {pick(lang, " ως τον φιόγκο.", " to the bow.")}
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

      {/* ── BOW BAND (the corsa-red world) ───────────────────── */}
      <section className="grain relative overflow-hidden bg-ink">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(60% 80% at 80% 30%, rgba(176,30,40,0.35), transparent 70%)",
          }}
        />
        <div className="shell relative grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
          <Reveal>
            <p className="eyebrow" style={{ color: "#D6394A" }}>
              Bow 4 Car
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] text-bone">
              {pick(lang, "Κάθε κλειδί αξίζει ", "Every key deserves ")}
              <span className="italic" style={{ color: "#D6394A" }}>
                {pick(lang, "έναν φιόγκο", "a bow")}
              </span>
              .
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-bone/80">
              {pick(
                lang,
                "Ο χειροποίητος φιόγκος που μεταμορφώνει την παράδοση ενός αυτοκινήτου σε αξέχαστη στιγμή. Νοίκιασέ τον για τη μέρα ή κάν' τον δικό σου. Παράδοση σε όλη την Ελλάδα ή παραλαβή από τη Βάρη.",
                "The handmade bow that turns a car delivery into an unforgettable moment. Rent it for the day or make it yours. Delivery across Greece or pickup from Vari."
              )}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/bow4car" className="btn-corsa">
                {pick(lang, "Δες τους φιόγκους", "See the bows")}
              </Link>
              <span className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-wider text-mute">
                {pick(lang, "Ενοικίαση από", "Rental from")} {fmtEur(minRent(), lang)}
              </span>
            </div>
          </Reveal>

          <Reveal delay={120} className="flex justify-center">
            <Image
              src={bowImages["lite"]}
              alt={pick(lang, "Αυτοκίνητο με φιόγκο", "Car with a bow")}
              className="w-full max-w-sm rounded-2xl border border-line"
            />
          </Reveal>
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
            <div className="relative mt-10 aspect-[1856/1478] w-full overflow-hidden rounded-2xl border border-line">
              <Image
                src={showroomImg}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover object-bottom"
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

      {/* ── VIDEO / SOCIAL ───────────────────────────────────── */}
      <section className="border-t border-line bg-carbon">
        <div className="shell py-20 md:py-28">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">{pick(lang, "Το κανάλι μας", "Our channel")}</p>
            <h2 className="mt-4 font-display text-4xl leading-tight text-bone md:text-5xl">
              {pick(lang, "Κάθε όχημα, σε ", "Every car, on ")}
              <span className="italic text-gold">{pick(lang, "βίντεο", "video")}</span>.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-mute">
              {pick(
                lang,
                "Παρουσιάζουμε τιμή, περιγραφή και κάθε λεπτομέρεια πριν έρθεις. Δες όλα τα αυτοκίνητά μας συγκεντρωμένα στα κανάλια μας, με νέο περιεχόμενο στο Telegram.",
                "We show the price, description and every detail before you visit. See all our cars on our channels, with fresh content on Telegram."
              )}
            </p>
          </Reveal>

          <Reveal delay={120} className="mt-12 flex flex-wrap justify-center gap-3">
            {[
              ["Telegram", site.socials.telegram],
              ["Instagram", site.socials.instagram],
              ["TikTok", site.socials.tiktok],
              ["YouTube", site.socials.youtube],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                {label}
              </a>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
