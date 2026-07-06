import type { Metadata } from "next";
import { getLang } from "@/lib/lang";
import { pick } from "@/lib/i18n";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Πολιτική Απορρήτου & Όροι",
  robots: { index: false, follow: true },
};

export default async function PrivacyPage() {
  const lang = await getLang();
  return (
    <div className="pt-28 md:pt-36">
      <div className="shell max-w-3xl pb-24">
        <p className="eyebrow">{pick(lang, "Νομικά", "Legal")}</p>
        <h1 className="mt-4 font-display text-4xl leading-tight text-bone md:text-5xl">
          {pick(
            lang,
            "Πολιτική Απορρήτου · Όροι Χρήσης · Cookies",
            "Privacy Policy · Terms of Use · Cookies"
          )}
        </h1>
        <div className="mt-8 space-y-5 leading-relaxed text-mute">
          <p>
            {pick(
              lang,
              "Το πλήρες νομικό κείμενο (GDPR, όροι πώλησης, ενοικίασης φιόγκου και πολιτική cookies) οριστικοποιείται με τον πελάτη πριν το launch.",
              "The full legal text (GDPR, sale and bow-rental terms, and the cookie policy) is finalised with the client before launch."
            )}
          </p>
          <p>
            {pick(
              lang,
              "Για κάθε ερώτημα σχετικά με τα δεδομένα σου, επικοινώνησε στο ",
              "For any question about your data, get in touch at "
            )}
            <a href={`mailto:${site.email}`} className="text-gold">
              {site.email}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
