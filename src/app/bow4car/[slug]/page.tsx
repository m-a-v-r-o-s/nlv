import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { bows, getBow, fmtEur } from "@/lib/bows";
import { bowImages } from "@/lib/bowImages";
import { BowCheckout } from "@/components/BowCheckout";
import { getLang } from "@/lib/lang";
import { pick } from "@/lib/i18n";

export function generateStaticParams() {
  return bows.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const bow = getBow(slug);
  if (!bow) return { title: "Φιόγκος" };
  return {
    title: `Φιόγκος ${bow.name} · ${bow.dimensions}`,
    description: `${bow.name} · ${bow.tagline.el}. ${
      bow.rentPrice ? `Ενοικίαση ${fmtEur(bow.rentPrice)} ή ` : ""
    }αγορά ${fmtEur(bow.buyPrice)}.`,
  };
}

export default async function BowConfigurePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const bow = getBow(slug);
  if (!bow) notFound();
  const lang = await getLang();

  return (
    <div className="pt-28 md:pt-36">
      <div className="shell pb-24">
        <Link
          href="/bow4car"
          className="font-mono text-[12px] uppercase tracking-wider text-mute hover:text-bone"
        >
          ← {pick(lang, "Όλοι οι φιόγκοι", "All bows")}
        </Link>

        <div className="mt-6 grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-center">
          <header>
            <span className="eyebrow" style={{ color: "#D6394A" }}>
              Bow 4 Car
            </span>
            <h1 className="mt-4 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] text-bone">
              {pick(lang, "Φιόγκος ", "The ")}
              <span className="italic text-gold">{bow.name}</span>
            </h1>
            <p className="mt-4 text-lg text-mute">
              {pick(lang, bow.tagline.el, bow.tagline.en)} · {bow.dimensions}
            </p>
            <p className="mt-2 flex items-start gap-2 text-[14px] text-faint">
              <span className="text-gold">·</span>
              {pick(lang, bow.material.el, bow.material.en)} · {pick(lang, bow.lead.el, bow.lead.en)}
            </p>
            <ul className="mt-6 space-y-2">
              {pick(lang, bow.includes.el, bow.includes.en).map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] text-bone">
                  <span className="mt-0.5 text-corsasoft">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </header>

          <Image
            src={bowImages[bow.slug]}
            alt={`${pick(lang, "Φιόγκος", "Bow")} ${bow.name}`}
            className="w-full rounded-2xl border border-line"
          />
        </div>

        <div className="mt-14">
          <BowCheckout bow={bow} lang={lang} />
        </div>
      </div>
    </div>
  );
}
