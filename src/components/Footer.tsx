import Link from "next/link";
import { nav, site } from "@/lib/site";
import { type Lang, pick } from "@/lib/i18n";
import { AssistantNavButton } from "./AssistantNavButton";
import { Wordmark } from "./Wordmark";

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer id="contact" className="relative border-t border-line bg-carbon">
      <div className="shell py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Wordmark size="lg" />
            <p className="mt-6 max-w-sm font-display text-2xl leading-snug text-bone/90">
              {pick(
                lang,
                "Το επόμενο αυτοκίνητό σου ξεκινά εδώ.",
                "Your next car starts here."
              )}
            </p>
            <p className="mt-6 spec normal-case tracking-normal text-mute">
              {pick(lang, site.tagline.el, site.tagline.en)} · {site.name}
            </p>
          </div>

          <div>
            <p className="eyebrow-mute">{pick(lang, "Πλοήγηση", "Navigation")}</p>
            <ul className="mt-5 space-y-3">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="text-mute transition-colors hover:text-bone"
                  >
                    {pick(lang, n.el, n.en)}
                  </Link>
                </li>
              ))}
              <li>
                <AssistantNavButton
                  label={pick(lang, "AI βοηθός", "AI assistant")}
                  className="text-gold transition-colors hover:text-goldsoft"
                />
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow-mute">{pick(lang, "Επικοινωνία", "Contact")}</p>
            <ul className="mt-5 space-y-3 text-mute">
              <li>
                <address className="not-italic">
                  {site.address.street}
                  <br />
                  {site.address.area} {site.address.postal},{" "}
                  {site.address.region}
                </address>
              </li>
              <li>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="font-mono transition-colors hover:text-gold"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="transition-colors hover:text-bone"
                >
                  {site.email}
                </a>
              </li>
            </ul>

            <Link href="/import" className="btn-ghost mt-7">
              {pick(lang, "Ζήτησε εισαγωγή", "Request an import")}
            </Link>
          </div>
        </div>

        <div className="hairline mt-14 flex flex-col gap-3 pt-6 text-[12px] text-faint sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <span>
              © {new Date().getFullYear()} {site.name}
            </span>
            <span>© 2026 AKOS DIGITAL. All rights reserved.</span>
          </div>
          <Link href="/privacy" className="transition-colors hover:text-mute">
            {pick(
              lang,
              "Πολιτική Απορρήτου · Όροι Χρήσης · Cookies",
              "Privacy Policy · Terms · Cookies"
            )}
          </Link>
        </div>
      </div>
    </footer>
  );
}
