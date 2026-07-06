import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { BowMark } from "@/components/BowMark";
import { bows, bowColor, minRent, fmtEur } from "@/lib/bows";
import { bowImages } from "@/lib/bowImages";
import { getLang } from "@/lib/lang";
import { pick } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Bow 4 Car · Ο φιόγκος της αξέχαστης στιγμής",
  description:
    "Χειροποίητοι φιόγκοι αυτοκινήτου προς ενοικίαση ή αγορά. Παράδοση σε όλη την Ελλάδα ή παραλαβή από τη Βάρη.",
};

export default async function Bow4CarPage() {
  const lang = await getLang();

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="grain relative overflow-hidden border-b border-line">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(70% 90% at 70% 20%, rgba(176,30,40,0.35), transparent 65%)",
          }}
        />
        <div className="shell relative grid items-center gap-10 py-20 md:grid-cols-[1.2fr_1fr] md:py-32">
          <Reveal>
            <span className="eyebrow" style={{ color: "#D6394A" }}>
              Bow 4 Car
            </span>
            <h1 className="mt-5 font-display text-[clamp(3rem,8vw,6rem)] leading-[0.9] text-bone">
              {pick(lang, "Δώσ' του ", "Give it a ")}
              <span className="italic" style={{ color: "#D6394A" }}>
                {pick(lang, "φιόγκο", "bow")}
              </span>
              .
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-bone/80">
              {pick(
                lang,
                "Ο χειροποίητος φιόγκος που μετατρέπει την παράδοση ενός αυτοκινήτου σε στιγμή που δεν ξεχνιέται. Νοίκιασέ τον για τη μέρα ή κάν' τον δικό σου.",
                "The handmade bow that turns a car delivery into a moment you never forget. Rent it for the day or make it yours."
              )}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="#bows" className="btn-corsa">
                {pick(lang, "Διάλεξε φιόγκο", "Choose a bow")}
              </Link>
              <span className="inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-wider text-mute">
                {pick(lang, "Ενοικίαση από", "Rental from")} {fmtEur(minRent(), lang)}
              </span>
            </div>
          </Reveal>

          <Reveal delay={120} className="flex justify-center">
            <div className="relative">
              <div
                className="absolute inset-0 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(176,30,40,0.45), transparent 60%)",
                }}
              />
              <BowMark
                size={300}
                color="#B01E28"
                ribbon="#8A1620"
                tails
                className="relative"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Product grid */}
      <section id="bows" className="border-t border-line bg-carbon">
        <div className="shell py-20 md:py-28">
          <Reveal>
            <p className="eyebrow">{pick(lang, "Οι φιόγκοι", "The bows")}</p>
            <h2 className="mt-3 font-display text-4xl leading-tight text-bone md:text-5xl">
              {pick(lang, "Διάλεξε το πακέτο", "Choose your package")}
            </h2>
            <p className="mt-4 max-w-lg text-mute">
              {pick(
                lang,
                "Από τον απλό χάρτινο φιόγκο μέχρι το πλήρες πακέτο με στολισμό, μπαλόνια και λουλούδια.",
                "From the simple cardboard bow to the full package with decoration, balloons and flowers."
              )}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {bows.map((b, i) => (
              <Reveal key={b.slug} delay={i * 90}>
                <Link
                  href={`/bow4car/${b.slug}`}
                  className="card group flex h-full flex-col"
                >
                  <div className="overflow-hidden">
                    <Image
                      src={bowImages[b.slug]}
                      alt={`${pick(lang, "Φιόγκος", "Bow")} ${b.name}`}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-lux group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-display text-2xl text-bone">{b.name}</h3>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-faint">
                        {b.dimensions}
                      </span>
                    </div>
                    <p className="mt-2 text-[14px] text-mute">
                      {pick(lang, b.tagline.el, b.tagline.en)}
                    </p>
                    <p className="mt-1 font-mono text-[12px] text-faint">
                      {pick(lang, b.material.el, b.material.en)}
                    </p>

                    <div className="mt-6 flex items-end justify-between border-t border-line pt-5">
                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-wider text-faint">
                          {b.rentPrice ? pick(lang, "Ενοικίαση", "Rental") : pick(lang, "Μόνο αγορά", "Buy only")}
                        </p>
                        <p className="font-mono text-lg text-bone">
                          {b.rentPrice ? fmtEur(b.rentPrice, lang) : "·"}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-[11px] uppercase tracking-wider text-faint">
                          {pick(lang, "Αγορά", "Purchase")}
                        </p>
                        <p className="font-mono text-lg text-gold">
                          {fmtEur(b.buyPrice, lang)}
                        </p>
                      </div>
                    </div>

                    <span className="mt-6 font-mono text-[12px] uppercase tracking-widest2 text-corsasoft transition-transform duration-500 ease-lux group-hover:translate-x-1">
                      {pick(lang, "Διάλεξε", "Choose")} →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* single colour note */}
          <Reveal className="mt-14 flex flex-wrap items-center justify-center gap-3">
            <span className="eyebrow-mute">{pick(lang, "Χρώμα", "Colour")}</span>
            <span className="flex items-center gap-2">
              <span
                className="h-5 w-5 rounded-full border border-black/30"
                style={{ background: bowColor.hex }}
              />
              <span className="font-mono text-[12px] text-mute">{bowColor.name}</span>
            </span>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
