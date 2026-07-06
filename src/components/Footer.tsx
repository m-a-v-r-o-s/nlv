import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/lib/site";
import { type Lang, pick } from "@/lib/i18n";
import { socialIcons } from "@/lib/socialIcons";
import { AssistantNavButton } from "./AssistantNavButton";
import logo from "./bandito-white.png";

const socialLinks: [string, string][] = [
  ["Instagram", site.socials.instagram],
  ["TikTok", site.socials.tiktok],
  ["YouTube", site.socials.youtube],
  ["Telegram", site.socials.telegram],
  ["Facebook", site.socials.facebook],
];

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer id="contact" className="relative border-t border-line bg-carbon">
      <div className="shell py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image
              src={logo}
              alt="#BANDITO · Next Level Vision"
              className="w-full max-w-[280px]"
            />
            <p className="mt-6 max-w-sm font-display text-2xl leading-snug text-bone/90">
              {pick(
                lang,
                "Το επόμενο αυτοκίνητό σου, ή το πιο αξέχαστο δώρο, ξεκινά εδώ.",
                "Your next car, or the most unforgettable gift, starts here."
              )}
            </p>
            <p className="mt-6 spec normal-case tracking-normal text-mute">
              {site.hashtag} · Next Level Vision
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
                  label="Bandito AI"
                  className="text-gold transition-colors hover:text-goldsoft"
                />
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow-mute">{pick(lang, "Επικοινωνία", "Contact")}</p>
            <ul className="mt-5 space-y-3 text-mute">
              <li>
                <a
                  href={site.address.maps}
                  className="transition-colors hover:text-bone"
                  target="_blank"
                  rel="noreferrer"
                >
                  {site.address.street}, {site.address.area}{" "}
                  {site.address.postal}
                </a>
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
              <li>
                <a
                  href={site.socials.telegram}
                  target="_blank"
                  rel="noreferrer"
                  className="text-gold transition-colors hover:text-goldsoft"
                >
                  {pick(lang, "Κανάλι Telegram", "Telegram channel")} →
                </a>
              </li>
            </ul>

            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  title={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-mute transition-colors hover:border-gold hover:text-gold"
                >
                  <svg
                    viewBox="0 0 24 24"
                    role="img"
                    aria-hidden="true"
                    className="h-[18px] w-[18px] fill-current"
                  >
                    <path d={socialIcons[label.toLowerCase()]} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="hairline mt-14 flex flex-col gap-3 pt-6 text-[12px] text-faint sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1">
            <span>© {new Date().getFullYear()} Next Level Vision · #Bandito_NLV</span>
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
