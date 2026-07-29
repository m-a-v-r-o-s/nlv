import type { Metadata } from "next";
import Image from "next/image";
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
      pick(lang, "Πες μας τι ψάχνεις", "Tell us what you’re after"),
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

  // People-based reductions (not vehicle types), shown separately.
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
          <h1 className="font-display text-[clamp(2.75rem,7vw,5rem)] leading-[0.95] text-bone">
            {pick(lang, "Η εισαγωγή ", "Importing ")}
            <span className="mark">{pick(lang, "συμφέρει", "pays off")}</span>.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-mute">
            {pick(
              lang,
              "Αναλαμβάνουμε όλη τη διαδικασία, από το πρώτο έως το τελικό στάδιο: αναζήτηση σε Car Markets Γερμανίας και ευρωπαϊκές δημοπρασίες, αγορά, μεταφορά, εκτελωνισμό και ταξινόμηση. Έτοιμο στην Ελλάδα σε 2-3 εβδομάδες.",
              "We handle the entire process, from the first stage to the last: sourcing from German car markets and European auctions, purchase, transport, customs and registration. Ready in Greece in 2-3 weeks."
            )}
          </p>
          <a href="#request" className="btn-gold mt-8">
            {pick(lang, "Ξεκίνα την αναζήτηση", "Start the search")}
          </a>
        </header>

        {/* Why it pays off */}
        <div className="mt-16 grid items-center gap-8 md:grid-cols-[1.15fr_1fr] md:gap-12">
          <dl className="border-t border-line">
            {whyPoints.map(([t, d]) => (
              <div key={t} className="border-b border-line py-6">
                <dt className="font-display text-xl text-bone">{t}</dt>
                <dd className="mt-2 text-[15px] leading-relaxed text-mute">{d}</dd>
              </div>
            ))}
          </dl>

          <div className="relative aspect-[4/3] w-full overflow-hidden border border-line md:aspect-[3/4]">
            <Image
              src={transportImg}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 480px"
              className="object-cover"
            />
          </div>
        </div>

        {/* How the final price is calculated, set as a ledger, because that is
            what it is: one line per component, totalled at the bottom. */}
        <section className="mt-28">
          <h2 className="max-w-2xl font-display text-3xl leading-tight text-bone md:text-4xl">
            {pick(
              lang,
              "Πώς υπολογίζεται η τελική τιμή",
              "How the final price is calculated"
            )}
          </h2>

          <ol className="mt-10 border-t border-line">
            {costParts.map(([t, d], i) => (
              <li
                key={t}
                className="grid grid-cols-[1.5rem_minmax(0,1fr)] items-baseline gap-x-4 gap-y-1 border-b border-line py-5 md:grid-cols-[1.5rem_20rem_minmax(0,1fr)]"
              >
                <span className="font-mono text-[15px] text-gold">
                  {i === 0 ? "=" : "+"}
                </span>
                <h3 className="font-display text-lg text-bone">{t}</h3>
                <p className="col-start-2 text-[14px] leading-relaxed text-mute md:col-start-3">
                  {d}
                </p>
              </li>
            ))}
            <li className="grid grid-cols-[1.5rem_minmax(0,1fr)] items-baseline gap-x-4 border-b border-gold/40 py-5">
              <span className="font-mono text-[15px] text-gold">=</span>
              <h3 className="font-display text-lg text-gold">
                {pick(
                  lang,
                  "Πλήρες κόστος στην πόρτα σου",
                  "Full cost, delivered to your door"
                )}
              </h3>
            </li>
          </ol>
        </section>

        {/* Registration tax reductions */}
        <section className="mt-20">
          <h2 className="max-w-2xl font-display text-3xl leading-tight text-bone md:text-4xl">
            {pick(
              lang,
              "Ποια οχήματα συμφέρουν περισσότερο",
              "Which cars pay off more"
            )}
          </h2>

          <div className="mt-8 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
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
                <span className="num whitespace-nowrap font-mono text-[13px] text-gold">
                  {val}
                </span>
              </div>
            ))}
          </div>

          {/* People-based reductions, shown separately */}
          <h3 className="mt-12 font-display text-xl text-bone">
            {pick(lang, "Ειδικές κατηγορίες δικαιούχων", "Special eligibility groups")}
          </h3>
          <p className="mt-1.5 text-[14px] leading-relaxed text-faint">
            {pick(
              lang,
              "Αφορούν πρόσωπα, όχι τύπους οχήματος.",
              "These apply to people, not vehicle types."
            )}
          </p>
          <div className="mt-5 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
            {specialGroups.map(([cat, val]) => (
              <div
                key={cat}
                className="flex items-center justify-between gap-4 bg-carbon p-5"
              >
                <span className="text-[15px] text-bone">{cat}</span>
                <span className="num whitespace-nowrap font-mono text-[13px] text-gold">
                  {val}
                </span>
              </div>
            ))}
          </div>

          <h3 className="mt-12 font-display text-xl text-bone">
            {pick(lang, "Περιβαλλοντικό τέλος ανά εκπομπές", "Environmental fee by emissions")}
          </h3>
          <dl className="mt-5 border-t border-line">
            {emissionFees.map(([std, note]) => (
              <div
                key={std}
                className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-b border-line py-4"
              >
                <dt className="num font-mono text-[15px] text-bone">{std}</dt>
                <dd className="text-[14px] leading-relaxed text-mute">{note}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-[13px] leading-relaxed text-faint">
            {pick(
              lang,
              "Οι μειώσεις εξαρτώνται από την κατηγορία και τα δικαιολογητικά. Σου δίνουμε ακριβή υπολογισμό για το δικό σου όχημα πριν προχωρήσεις.",
              "Reductions depend on the category and supporting documents. We give you an exact calculation for your car before you proceed."
            )}
          </p>
        </section>

        {/* Final step: process + request form */}
        <section id="request" className="mt-28 scroll-mt-28 border-t border-line pt-16 md:pt-24">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl leading-tight text-bone md:text-5xl">
              {pick(lang, "Έτοιμος; Ζήτησέ το.", "Ready? Request it.")}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-mute">
              {pick(
                lang,
                "Πες μας το όχημα που ψάχνεις και ξεκινάμε. Πλήρες κόστος πριν προχωρήσεις, χωρίς δέσμευση.",
                "Tell us the car you’re after and we get started. Full cost before you commit, with no obligation."
              )}
            </p>
          </div>

          <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              {/* The one place a numbered label is honest: these steps run in
                  order and the number is the content, not decoration. */}
              <h3 className="font-mono text-[11px] uppercase tracking-widest2 text-faint">
                {pick(lang, "Η διαδικασία", "The process")}
              </h3>
              <ol className="mt-6 border-t border-line">
                {steps.map(([t, d], i) => (
                  <li key={t} className="flex gap-6 border-b border-line py-6">
                    <span className="num font-mono text-[13px] tracking-widest2 text-gold">
                      0{i + 1}
                    </span>
                    <div>
                      <h4 className="font-display text-xl text-bone">{t}</h4>
                      <p className="mt-1.5 text-[14px] leading-relaxed text-mute">{d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <ImportRequest lang={lang} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
