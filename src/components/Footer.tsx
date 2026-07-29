import Link from "next/link";
import { nav, site } from "@/lib/site";
import { type Lang, pick } from "@/lib/i18n";
import { AssistantNavButton } from "./AssistantNavButton";
import { Wordmark } from "./Wordmark";

// Closes the page with a statement and the address, the way a showroom's own
// stationery would. Not a sitemap: four destinations don't need four columns.
export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer id="contact" className="relative border-t border-line bg-carbon">
      <div className="shell py-16 md:py-24">
        <Wordmark size="lg" />

        <p className="mt-10 max-w-3xl font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] text-bone">
          {pick(
            lang,
            "Το επόμενο αυτοκίνητό σου ξεκινά εδώ.",
            "Your next car starts here."
          )}
        </p>

        <div className="mt-14 grid gap-10 border-t border-line pt-10 sm:grid-cols-[1.4fr_1fr] sm:items-start">
          <address className="not-italic leading-relaxed text-mute">
            {site.address.street}
            <br />
            {site.address.area} {site.address.postal}, {site.address.region}
            <br />
            <a
              href={`tel:${site.phoneHref}`}
              className="num font-mono text-bone transition-colors hover:text-gold"
            >
              {site.phone}
            </a>
            {" · "}
            <a
              href={`mailto:${site.email}`}
              className="transition-colors hover:text-bone"
            >
              {site.email}
            </a>
          </address>

          <div className="sm:justify-self-end">
            <Link href="/import" className="btn-ghost">
              {pick(lang, "Ζήτησε εισαγωγή", "Request an import")}
            </Link>
          </div>
        </div>

        <nav className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-line pt-8 font-mono text-[11px] uppercase tracking-wider">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="whitespace-nowrap text-mute transition-colors hover:text-bone"
            >
              {pick(lang, n.el, n.en)}
            </Link>
          ))}
          <AssistantNavButton
            label={pick(lang, "AI βοηθός", "AI assistant")}
            className="whitespace-nowrap text-mute transition-colors hover:text-bone"
          />
          <Link
            href="/privacy"
            className="whitespace-nowrap text-faint transition-colors hover:text-mute sm:ml-auto"
          >
            {pick(
              lang,
              "Απόρρητο · Όροι · Cookies",
              "Privacy · Terms · Cookies"
            )}
          </Link>
        </nav>

        <p className="mt-8 text-[12px] leading-relaxed text-faint">
          © {new Date().getFullYear()} {site.name} ·{" "}
          {pick(lang, site.tagline.el, site.tagline.en)}
          <br />© 2026 AKOS DIGITAL. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
