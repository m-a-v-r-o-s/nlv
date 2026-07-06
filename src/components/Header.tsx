"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { type Lang, pick, otherLang, LANG_COOKIE } from "@/lib/i18n";
import logo from "./banditoheader.webp";

export function Header({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  function setLang(next: Lang) {
    if (next === lang) return;
    document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-lux ${
        solid || open
          ? "border-b border-line bg-ink/90 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between md:h-20">
        <Link
          href="/"
          className="flex items-center"
          onClick={() => setOpen(false)}
          aria-label="Next Level Vision"
        >
          <Image
            src={logo}
            alt="Next Level Vision"
            priority
            className="h-9 w-auto md:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex lg:gap-7">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="whitespace-nowrap font-mono text-[11px] uppercase tracking-wider text-mute transition-colors hover:text-bone"
            >
              {pick(lang, n.el, n.en)}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => window.dispatchEvent(new Event("nlv:assistant-open"))}
            className="whitespace-nowrap font-mono text-[11px] uppercase tracking-wider text-gold transition-colors hover:text-goldsoft"
          >
            {"Bandito AI"}
          </button>
          <LangToggle lang={lang} onChange={setLang} />
          <a href={`tel:${site.phoneHref}`} className="btn-gold min-w-[7.5rem]">
            {pick(lang, "Κάλεσε", "Call")}
          </a>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <LangToggle lang={lang} onChange={setLang} />
          <button
            className="flex h-10 w-10 items-center justify-center"
            aria-label={
              open
                ? pick(lang, "Κλείσιμο μενού", "Close menu")
                : pick(lang, "Μενού", "Menu")
            }
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-4 w-6">
              <span
                className={`absolute left-0 h-[1.5px] w-6 bg-bone transition-all duration-300 ${
                  open ? "top-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-[1.5px] w-6 -translate-y-1/2 bg-bone transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-[1.5px] w-6 bg-bone transition-all duration-300 ${
                  open ? "top-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className={`md:hidden overflow-hidden bg-ink transition-[max-height] duration-500 ease-lux ${
          open ? "max-h-[80vh] border-t border-line" : "max-h-0"
        }`}
      >
        <div className="shell flex flex-col gap-1 py-6">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between border-b border-line/60 py-4 font-display text-2xl text-bone"
            >
              {pick(lang, n.el, n.en)}
              <span className="text-gold">→</span>
            </Link>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              window.dispatchEvent(new Event("nlv:assistant-open"));
            }}
            className="flex items-center justify-between border-b border-line/60 py-4 font-display text-2xl text-gold"
          >
            {"Bandito AI"}
            <span>→</span>
          </button>
          <a
            href={`tel:${site.phoneHref}`}
            className="btn-gold mt-5 w-full"
            onClick={() => setOpen(false)}
          >
            {site.phone}
          </a>
        </div>
      </div>
    </header>
  );
}

function LangToggle({
  lang,
  onChange,
}: {
  lang: Lang;
  onChange: (l: Lang) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(otherLang(lang))}
      aria-label={`Switch language to ${lang === "el" ? "English" : "Greek"}`}
      className="flex items-center rounded-full border border-line p-[2px] font-mono text-[10px] uppercase tracking-wide"
    >
      {(["el", "en"] as Lang[]).map((l) => (
        <span
          key={l}
          className={`rounded-full px-2 py-0.5 transition-colors ${
            lang === l ? "bg-gold text-ink" : "text-mute"
          }`}
        >
          {l === "el" ? "ΕΛ" : "EN"}
        </span>
      ))}
    </button>
  );
}
