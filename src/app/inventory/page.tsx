import type { Metadata } from "next";
import Link from "next/link";
import { cars } from "@/lib/cars";
import { InventoryBrowser } from "@/components/InventoryBrowser";
import { site } from "@/lib/site";
import { getLang } from "@/lib/lang";
import { pick } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Εισαγμένα αυτοκίνητα",
  description: `Τα εισαγμένα αυτοκίνητα της ${site.name}, premium οχήματα, ελεγμένα και έτοιμα για παράδοση.`,
};

export default async function InventoryPage() {
  const lang = await getLang();
  return (
    <div className="pt-28 md:pt-36">
      <div className="shell pb-16 md:pb-24">
        <header className="max-w-3xl">
          <h1 className="font-display text-[clamp(2.75rem,7vw,5rem)] leading-[0.95] text-bone">
            {pick(lang, "Επιλεγμένα, ", "Selected, ")}
            <span className="mark">{pick(lang, "ελεγμένα", "inspected")}</span>
            {pick(lang, ", έτοιμα.", ", ready.")}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-mute">
            {pick(
              lang,
              "Κάθε όχημα περνά πλήρη έλεγχο πριν μπει στη μάντρα. Δεν βρίσκεις αυτό που ψάχνεις; Το φέρνουμε με εισαγωγή κατά παραγγελία.",
              "Every car goes through a full inspection before it goes on sale. Can’t find what you’re after? We bring it in with import to order."
            )}
          </p>
          <Link href="/import" className="btn-gold mt-8">
            {pick(lang, "Ζήτησε εισαγωγή", "Request an import")}
          </Link>
        </header>

        <div className="mt-14">
          <InventoryBrowser cars={cars} lang={lang} />
        </div>
      </div>
    </div>
  );
}
