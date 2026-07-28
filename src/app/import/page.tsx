import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { ImportRequest } from "@/components/ImportRequest";
import { getLang } from "@/lib/lang";
import { pick } from "@/lib/i18n";
import transportImg from "@/components/transport.webp";

export const metadata: Metadata = {
  title: "Εισαγωγή αυτοκινήτου",
  description:
    "Εισαγωγή αυτοκινήτου από Car Markets Γερμανίας και ευρωπαϊκές δημοπρασίες. Αναλαμβάνουμε όλη τη διαδικασία, έτοιμο στην Ελλάδα σε 2-3 εβδομάδες.",
};

export default async function ImportPage() {
  const lang = await getLang();

  const whyPoints: [string, string][] = [
    [
      pick(lang, "Χαμηλότερη τιμή απόκτησης στην Ευρώπη", "Lower purchase price in Europe"),
      pick(lang, "Τιμές Car Market Γερμανίας και ευρωπαϊκών δημοπρασιών.", "German car market and European auction prices."),
    ],
    [
      pick(lang, "Χαμηλά έξοδα εισαγωγής", "Low import costs"),
      pick(lang, "Με σωστό υπολογισμό τέλους ταξινόμησης και μειώσεων.", "With the registration tax and reductions calculated correctly."),
    ],
  ];

  const steps: [string, string][] = [
    [
      pick(lang, "Πες μας τι ψάχνεις", "Tell us what you're after"),
      pick(lang, "Μάρκα, μοντέλο, budget και εξοπλισμό. Όσο πιο συγκεκριμένα, τόσο καλύτερα.", "Make, model, budget and options. The more specific, the better."),
    ],
    [
      pick(lang, "Αναζήτηση στην Ευρώπη", "Search across Europe"),
      pick(lang, "Car Markets Γερμανίας και ευρωπαϊκές δημοπρασίες, με έλεγχο πριν σου το προτείνουμε.", "German car markets and European auctions, inspected before we propose it."),
    ],
    [
      pick(lang, "Αγορά & μεταφορά", "Purchase & transport"),
      pick(lang, "Αγοράζουμε το όχημα και το μεταφέρουμε στην Ελλάδα.", "We buy the car and transport it to Greece."),
    ],
    [
      pick(lang, "Εκτελωνισμός & ταξινόμηση", "Customs & registration"),
      pick(lang, "Εκτελωνιστής, ΚΤΕΟ, τέλος ταξινόμησης και ελληνική πινακίδα.", "Customs broker, MOT (KTEO), registration tax and Greek plates."),
    ],
    [
      pick(lang, "Παράδοση", "Handover"),
      pick(lang, "Έτοιμο στην Ελλάδα σε 2-3 εβδομάδες, με ελληνική πινακίδα.", "Ready in Greece in 2-3 weeks, on Greek plates."),
    ],
  ];

  const costParts: [string, string][] = [
    [
      pick(lang, "Τιμή αγοράς στο Car Market", "Purchase price at the car market"),
      pick(lang, "Στη Γερμανία ή σε ευρωπαϊκή δημοπρασία.", "In Germany or at a European auction."),
    ],
    [
      pick(lang, "Κόστος υπηρεσιών του γραφείου", "Our service fee"),
      pick(lang, "Πληρώνεται σταδιακά.", "Paid in stages."),
    ],
    [
      pick(lang, "Μεταφορικά στην Ελλάδα", "Transport to Greece"),
      pick(lang, "Μεταφορά του οχήματος ως τη χώρα.", "Shipping the car to the country."),
    ],
    [
      pick(lang, "Τέλος Ταξινόμησης", "Registration tax"),
      pick(lang, "Φόρος εισαγωγής με πολύπλοκη φόρμουλα υπολογισμού.", "Import tax with a complex calculation formula."),
    ],
    [
      pick(lang, "Εκτελωνιστής & ΚΤΕΟ", "Customs broker & KTEO"),
      pick(lang, "Υπηρεσίες εκτελωνιστή και ΚΤΕΟ.", "Customs broker services and MOT."),
    ],
  ];

  const taxReductions: [string, string][] = [
    [pick(lang, "Αμιγώς ηλεκτρικά", "Fully electric"), pick(lang, "0€ τέλος ταξινόμησης", "€0 registration tax")],
    [pick(lang, "Plug-in Hybrid μέχρι 49 g CO₂/km", "Plug-in hybrid up to 49 g CO₂/km"), pick(lang, "25% του τέλους", "25% of the tax")],
    [pick(lang, "Υβριδικά από 50 g CO₂/km", "Hybrids from 50 g CO₂/km"), pick(lang, "50% του τέλους", "50% of the tax")],
    [pick(lang, "Taxi", "Taxi"), pick(lang, "13% του τέλους", "13% of the tax")],
    [pick(lang, "Τροχόσπιτα", "Motorhomes"), pick(lang, "50% του τέλους", "50% of the tax")],
  ];

  // People-based reductions (not vehicle types) — shown separately.
  const specialGroups: [string, string][] = [
    [pick(lang, "Πολύτεκνοι / τρίτεκνοι έως 2.000 cc", "Large families, up to 2,000 cc"), pick(lang, "0€ τέλος ταξινόμησης", "€0 registration tax")],
    [pick(lang, "ΑΜΕΑ", "People with disabilities"), pick(lang, "0€ τέλος ταξινόμησης", "€0 registration tax")],
  ];

  const emissionFees: [string, string][] = [
    ["EURO 6", pick(lang, "Κανονικό τέλος ταξινόμησης", "Standard registration tax")],
    ["EURO 5", pick(lang, "+ 1.000€ περιβαλλοντικό τέλος", "+ €1,000 environmental fee")],
    ["EURO 4", pick(lang, "+ 3.000€ περιβαλλοντικό τέλος", "+ €3,000 environmental fee")],
  ];

  return (
    <div className="pt-28 md:pt-36">
      <div className="shell pb-24">
        <header className="max-w-3xl">
          <p className="eyebrow">{pick(lang, "Εισαγωγή αυτοκινήτου", "Car import")}</p>
          <h1 className="mt-4 font-display text-[clamp(2.75rem,7vw,5rem)] leading-[0.95] text-bone">
            {pick(lang, "Η εισαγωγή ", "Importing ")}
            <span className="italic text-gold">{pick(lang, "συμφέρει.", "pays off.")}</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-mute">
            {pick(
              lang,
              "Αναλαμβάνουμε όλη τη διαδικασία, από το πρώτο έως το τελικό στάδιο: αναζήτηση σε Car Markets Γερμανίας και ευρωπαϊκές δημοπρασίες, αγορά, μεταφορά, εκτελωνισμό και ταξινόμηση. Έτοιμο στην Ελλάδα σε 2-3 εβδομάδες.",
              "We handle the entire process, from the first to the final stage: sourcing from German car markets and European auctions, purchase, transport, customs and registration. Ready in Greece in 2-3 weeks."
            )}
          </p>
          <a href="#request" className="btn-gold mt-8">
            {pick(lang, "Ξεκίνα την αναζήτηση", "Start the search")}
          </a>
        </header>

        {/* Why it pays off */}
        <div className="mt-12 grid items-center gap-8 md:grid-cols-[1.15fr_1fr] md:gap-12">
          <div className="grid gap-4">
            {whyPoints.map(([t, d], i) => (
              <Reveal key={t} delay={i * 80}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-line bg-carbon p-6">
                  <span className="text-2xl text-gold">↓</span>
                  <div>
                    <h3 className="font-display text-lg text-bone">{t}</h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-mute">{d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={160}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line md:aspect-[3/4]">
              <Image
                src={transportImg}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 480px"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>

        {/* How the final price is calculated */}
        <section className="mt-24">
          <Reveal>
            <p className="eyebrow">{pick(lang, "Διαφάνεια κόστους", "Cost transparency")}</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight text-bone md:text-4xl">
              {pick(lang, "Πώς υπολογίζεται η ", "How the ")}
              <span className="italic text-gold">{pick(lang, "τελική τιμή", "final price")}</span>
              {pick(lang, "", " is calculated")}
            </h2>
          </Reveal>
          <ol className="mt-8 flex flex-wrap justify-center gap-4">
            {costParts.map(([t, d], i) => (
              <Reveal
                key={t}
                delay={i * 60}
                className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)]"
              >
                <li className="h-full rounded-xl border border-line bg-carbon p-6">
                  <span className="font-mono text-[12px] tracking-widest2 text-gold">
                    {i === 0 ? "=" : "+"}
                  </span>
                  <h3 className="mt-3 font-display text-lg text-bone">{t}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-mute">{d}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* Registration tax reductions */}
        <section className="mt-24">
          <Reveal>
            <p className="eyebrow">{pick(lang, "Τέλος Ταξινόμησης", "Registration tax")}</p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl leading-tight text-bone md:text-4xl">
              {pick(lang, "Ποια οχήματα ", "Which cars ")}
              <span className="italic text-gold">{pick(lang, "συμφέρουν περισσότερο", "pay off more")}</span>
            </h2>
          </Reveal>

          <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
            {taxReductions.map(([cat, val], i) => (
              <div
                key={cat}
                className={`flex items-center justify-between gap-4 bg-carbon p-5 ${
                  i === taxReductions.length - 1 && taxReductions.length % 2 === 1
                    ? "sm:col-span-2"
                    : ""
                }`}
              >
                <span className="text-[15px] text-bone">{cat}</span>
                <span className="whitespace-nowrap font-mono text-[13px] text-gold">
                  {val}
                </span>
              </div>
            ))}
          </div>

          {/* People-based reductions, shown separately */}
          <p className="mt-10 eyebrow-mute">
            {pick(lang, "Ειδικές κατηγορίες δικαιούχων", "Special eligibility groups")}
          </p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-faint">
            {pick(
              lang,
              "Αφορούν πρόσωπα, όχι τύπους οχήματος.",
              "These apply to people, not vehicle types."
            )}
          </p>
          <div className="mt-4 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
            {specialGroups.map(([cat, val]) => (
              <div
                key={cat}
                className="flex items-center justify-between gap-4 bg-carbon p-5"
              >
                <span className="text-[15px] text-bone">{cat}</span>
                <span className="whitespace-nowrap font-mono text-[13px] text-gold">
                  {val}
                </span>
              </div>
            ))}
          </div>

          <p className="mt-10 eyebrow-mute">
            {pick(lang, "Περιβαλλοντικό τέλος ανά εκπομπές", "Environmental fee by emissions")}
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {emissionFees.map(([std, note]) => (
              <div key={std} className="rounded-xl border border-line bg-carbon p-5">
                <p className="font-mono text-lg text-bone">{std}</p>
                <p className="mt-1.5 text-[14px] leading-relaxed text-mute">{note}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-[13px] leading-relaxed text-faint">
            {pick(
              lang,
              "Οι μειώσεις εξαρτώνται από την κατηγορία και τα δικαιολογητικά. Σου δίνουμε ακριβή υπολογισμό για το δικό σου όχημα πριν προχωρήσεις.",
              "Reductions depend on the category and supporting documents. We give you an exact calculation for your car before you proceed."
            )}
          </p>
        </section>

        {/* Final step: process + request form */}
        <section id="request" className="mt-24 scroll-mt-28 border-t border-line pt-16 md:pt-20">
          <Reveal className="text-center">
            <p className="eyebrow">{pick(lang, "Ξεκίνα", "Get started")}</p>
            <h2 className="mx-auto mt-3 max-w-2xl font-display text-4xl leading-tight text-bone md:text-5xl">
              {pick(lang, "Έτοιμος; ", "Ready? ")}
              <span className="italic text-gold">{pick(lang, "Ζήτησέ το.", "Request it.")}</span>
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-mute">
              {pick(
                lang,
                "Πες μας το όχημα που ψάχνεις και ξεκινάμε. Πλήρες κόστος πριν προχωρήσεις, χωρίς δέσμευση.",
                "Tell us the car you're after and we get started. Full cost before you commit, with no obligation."
              )}
            </p>
          </Reveal>

          <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <p className="eyebrow">{pick(lang, "Η διαδικασία", "The process")}</p>
              <ol className="mt-6 space-y-px overflow-hidden rounded-xl border border-line bg-line">
                {steps.map(([t, d], i) => (
                  <Reveal key={t} delay={i * 70} className="bg-carbon">
                    <li className="flex gap-5 p-6">
                      <span className="font-mono text-[13px] tracking-widest2 text-gold">
                        0{i + 1}
                      </span>
                      <div>
                        <h3 className="font-display text-xl text-bone">{t}</h3>
                        <p className="mt-1.5 text-[14px] leading-relaxed text-mute">{d}</p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <p className="eyebrow mb-4">{pick(lang, "Ζήτησέ το", "Request it")}</p>
              <ImportRequest lang={lang} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
