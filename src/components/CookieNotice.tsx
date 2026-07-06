"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { type Lang, pick } from "@/lib/i18n";

const ACK = "cookie-consent";

// Consent is stored as "all" (essential + analytics) or "necessary". Analytics
// isn't wired yet — this records the preference for when it goes live.
export function CookieNotice({ lang }: { lang: Lang }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = document.cookie
      .split("; ")
      .some((c) => c.startsWith(`${ACK}=`));
    if (!seen) setShow(true);
  }, []);

  function choose(value: "all" | "necessary") {
    document.cookie = `${ACK}=${value}; path=/; max-age=31536000; samesite=lax`;
    setShow(false);
  }

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookies"
      className="fixed bottom-4 left-4 right-4 z-[60] sm:right-auto sm:max-w-sm"
    >
      <div className="grain relative overflow-hidden rounded-2xl border border-line bg-ink/90 p-6 shadow-2xl backdrop-blur-md">
        <p className="eyebrow">Cookies</p>
        <p className="mt-3 text-[13px] leading-relaxed text-mute">
          {pick(
            lang,
            "Χρησιμοποιούμε απαραίτητα cookies για να λειτουργεί ο ιστότοπος (όπως η προτίμηση γλώσσας) και cookies analytics για να καταλαβαίνουμε πώς χρησιμοποιείται και να τον βελτιώνουμε.",
            "We use essential cookies for the site to work (like your language preference) and analytics cookies to understand how it's used and improve it."
          )}{" "}
          <Link href="/privacy" className="text-gold transition-colors hover:text-goldsoft">
            {pick(lang, "Πολιτική Απορρήτου", "Privacy Policy")}
          </Link>
          .
        </p>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button onClick={() => choose("all")} className="btn-gold">
            {pick(lang, "Αποδοχή όλων", "Accept all")}
          </button>
          <button onClick={() => choose("necessary")} className="btn-ghost">
            {pick(lang, "Μόνο απαραίτητα", "Necessary only")}
          </button>
        </div>
      </div>
    </div>
  );
}
