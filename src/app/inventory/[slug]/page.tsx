import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  cars,
  getCar,
  fmtEur,
  fmtNum,
  carHeadline,
  carHighlights,
  fuelLabel,
  gearboxLabel,
  bodyLabel,
  statusLabel,
} from "@/lib/cars";
import { CarArt } from "@/components/CarArt";
import { CarCard } from "@/components/CarCard";
import { BowMark } from "@/components/BowMark";
import { site } from "@/lib/site";
import { getLang } from "@/lib/lang";
import { pick } from "@/lib/i18n";

export function generateStaticParams() {
  return cars.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const car = getCar(slug);
  if (!car) return { title: "Όχημα" };
  return {
    title: `${car.make} ${car.model} ${car.year}`,
    description: `${car.make} ${car.model} ${car.year} · ${car.headline}. ${fmtEur(
      car.price
    )}.`,
  };
}

export default async function CarPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const car = getCar(slug);
  if (!car) notFound();
  const lang = await getLang();

  const related = cars
    .filter((c) => c.slug !== car.slug && c.body === car.body)
    .slice(0, 3);
  const fill =
    related.length < 3
      ? cars
          .filter((c) => c.slug !== car.slug && !related.includes(c))
          .slice(0, 3 - related.length)
      : [];
  const also = [...related, ...fill];

  const specs: [string, string][] = [
    [pick(lang, "Χρονολογία", "Year"), String(car.year)],
    [pick(lang, "Χιλιόμετρα", "Mileage"), `${fmtNum(car.km, lang)} ${pick(lang, "χλμ", "km")}`],
    [pick(lang, "Κυβικά", "Engine"), `${fmtNum(car.cc, lang)} cc`],
    [pick(lang, "Ιπποδύναμη", "Power"), `${car.hp} hp`],
    [pick(lang, "Κιβώτιο", "Gearbox"), gearboxLabel(car.gearbox, lang)],
    [pick(lang, "Καύσιμο", "Fuel"), fuelLabel(car.fuel, lang)],
    [pick(lang, "Αμάξωμα", "Body"), bodyLabel(car.body, lang)],
    [pick(lang, "Χρώμα", "Colour"), car.color],
  ];

  const mailSubject = encodeURIComponent(
    `${pick(lang, "Ενδιαφέρον", "Interested in")}: ${car.make} ${car.model} ${car.year}`
  );

  return (
    <div className="pt-16 md:pt-20">
      {/* Hero */}
      <section className="grain relative overflow-hidden border-b border-line">
        <div className="aspect-[16/10] w-full md:aspect-[21/9]">
          <CarArt car={car} className="h-full w-full" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />

        <div className="shell relative -mt-24 pb-4 md:-mt-32">
          <Link
            href="/inventory"
            className="font-mono text-[12px] uppercase tracking-wider text-mute hover:text-bone"
          >
            ← {pick(lang, "Εισαγμένα αυτοκίνητα", "Imported cars")}
          </Link>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow">{car.year}</p>
              <h1 className="mt-2 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] text-bone">
                {car.make} <span className="italic text-gold">{car.model}</span>
              </h1>
              <p className="mt-3 max-w-xl text-lg text-mute">
                {carHeadline(car, lang)}
              </p>
            </div>
            <p className="font-mono text-3xl text-gold md:text-4xl">
              {fmtEur(car.price, lang)}
            </p>
          </div>
        </div>
      </section>

      <div className="shell grid gap-14 py-16 md:grid-cols-[1.5fr_1fr] md:gap-20 md:py-24">
        {/* Left: specs + highlights */}
        <div>
          <p className="eyebrow">{pick(lang, "Τεχνικά", "Specs")}</p>
          <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
            {specs.map(([k, v]) => (
              <div key={k} className="bg-carbon p-5">
                <dt className="font-mono text-[11px] uppercase tracking-wider text-faint">
                  {k}
                </dt>
                <dd className="mt-2 font-mono text-[15px] text-bone">{v}</dd>
              </div>
            ))}
          </dl>

          <p className="eyebrow mt-14">{pick(lang, "Χαρακτηριστικά", "Highlights")}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {carHighlights(car, lang).map((h) => (
              <li
                key={h}
                className="flex items-start gap-3 rounded-lg border border-line bg-carbon p-4 text-[15px] text-bone"
              >
                <span className="mt-0.5 text-gold">·</span>
                {h}
              </li>
            ))}
          </ul>

          {/* Photo placeholder note */}
          <div className="mt-10 rounded-xl border border-dashed border-line p-6 text-center">
            <p className="font-mono text-[12px] uppercase tracking-wider text-faint">
              Gallery
            </p>
            <p className="mt-2 text-sm text-mute">
              {pick(
                lang,
                "Οι πραγματικές φωτογραφίες & το βίντεο παρουσίασης προστίθενται εδώ.",
                "Real photos & the video presentation are added here."
              )}
            </p>
          </div>
        </div>

        {/* Right: sticky action card */}
        <aside className="md:sticky md:top-28 md:self-start">
          <div className="rounded-2xl border border-line bg-carbon p-7">
            <div className="flex items-center justify-between">
              <span className="eyebrow">{pick(lang, "Ενδιαφέρον;", "Interested?")}</span>
              <span
                className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider ${
                  car.status === "available"
                    ? "bg-gold/15 text-gold"
                    : "bg-corsa/20 text-corsasoft"
                }`}
              >
                {statusLabel(car.status, lang)}
              </span>
            </div>

            <p className="mt-4 font-mono text-3xl text-bone">
              {fmtEur(car.price, lang)}
            </p>
            <p className="mt-1 text-[13px] text-faint">
              {pick(
                lang,
                "Τιμή οχήματος · εκτός τελών ταξινόμησης",
                "Vehicle price · excludes registration taxes"
              )}
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <a href={`tel:${site.phoneHref}`} className="btn-gold w-full">
                {pick(lang, "Κάλεσε", "Call")} {site.phone}
              </a>
              <a
                href={`mailto:${site.email}?subject=${mailSubject}`}
                className="btn-ghost w-full"
              >
                {pick(lang, "Στείλε μήνυμα", "Send a message")}
              </a>
              <a
                href={site.socials.telegram}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost w-full"
              >
                {pick(lang, "Δες στο Telegram", "See it on Telegram")}
              </a>
            </div>

            {/* Bow cross-sell */}
            <Link
              href="/bow4car"
              className="mt-6 flex items-center gap-3 rounded-xl border border-line bg-ink p-4 transition-colors hover:border-corsa/60"
            >
              <BowMark size={34} color="#B01E28" ribbon="#8A1620" tails />
              <div>
                <p className="font-display text-[15px] text-bone">
                  {pick(lang, "Παράδοση με φιόγκο;", "Delivery with a bow?")} →
                </p>
              </div>
            </Link>
          </div>
        </aside>
      </div>

      {/* Related */}
      {also.length > 0 && (
        <section className="border-t border-line bg-carbon">
          <div className="shell py-16 md:py-24">
            <p className="eyebrow">{pick(lang, "Δες επίσης", "See also")}</p>
            <h2 className="mt-3 font-display text-3xl text-bone md:text-4xl">
              {pick(lang, "Παρόμοια εισαγμένα αυτοκίνητα", "Similar imported cars")}
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {also.map((c) => (
                <CarCard key={c.slug} car={c} lang={lang} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
