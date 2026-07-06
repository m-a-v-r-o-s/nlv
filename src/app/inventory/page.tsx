import type { Metadata } from "next";
import { cars } from "@/lib/cars";
import { InventoryBrowser } from "@/components/InventoryBrowser";
import { site } from "@/lib/site";
import { getLang } from "@/lib/lang";
import { pick } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Εισαγμένα αυτοκίνητα",
  description:
    "Τα εισαγμένα αυτοκίνητα της Next Level Vision, premium οχήματα, ελεγμένα και έτοιμα για παράδοση.",
};

export default async function InventoryPage() {
  const lang = await getLang();
  return (
    <div className="pt-28 md:pt-36">
      <div className="shell pb-16 md:pb-24">
        <header className="max-w-3xl">
          <p className="eyebrow">{pick(lang, "Εισαγμένα αυτοκίνητα", "Imported cars")}</p>
          <h1 className="mt-4 font-display text-[clamp(2.75rem,7vw,5rem)] leading-[0.95] text-bone">
            {pick(lang, "Επιλεγμένα, ", "Selected, ")}
            <span className="italic text-gold">{pick(lang, "ελεγμένα", "inspected")}</span>
            {pick(lang, ", έτοιμα.", ", ready.")}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-mute">
            {pick(
              lang,
              "Κάθε όχημα περνά έλεγχο και συνοδεύεται από βίντεο παρουσίαση. Δεν βρίσκεις αυτό που ψάχνεις; Το φέρνουμε με εισαγωγή κατά παραγγελία.",
              "Every car is inspected and comes with a video presentation. Can't find what you're after? We bring it in with import to order."
            )}
          </p>
          <a
            href={site.cargr}
            target="_blank"
            rel="noreferrer"
            className="btn-gold mt-8"
          >
            {pick(lang, "Δες όλη τη λίστα στο car.gr", "View the full list on car.gr")} →
          </a>
        </header>

        <div className="mt-14">
          <InventoryBrowser cars={cars} lang={lang} />
        </div>
      </div>
    </div>
  );
}
