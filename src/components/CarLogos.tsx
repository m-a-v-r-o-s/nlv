"use client";

import { useState } from "react";
import { brands } from "@/lib/logos";
import { type Lang, pick } from "@/lib/i18n";

// Scrolling brand strip. Uses the `.ticker-track` marquee (translateX 0 -> -50%).
// The list is repeated so one half is always wider than the viewport, which
// keeps the loop seamless with no empty gap when the logos "finish".
//
// The strip runs longer than 5s, so WCAG 2.2.2 needs a way to stop it: hover
// and keyboard focus pause it via CSS, and the toggle below covers touch.
export function CarLogos({ lang }: { lang: Lang }) {
  const [paused, setPaused] = useState(false);
  const logos = brands.filter((b) => b.path); // drop marks we don't have (Cupra, Lexus)
  const loop = [...logos, ...logos, ...logos, ...logos];

  return (
    <div
      id="brand-ticker"
      className="ticker group relative overflow-hidden border-t border-line/30 bg-ink/30 py-6 backdrop-blur-sm"
    >
      <div
        className="ticker-track items-center"
        style={paused ? { animationPlayState: "paused" } : undefined}
      >
        {loop.map((b, i) => (
          <span
            key={`${b.name}-${i}`}
            className="mx-10 inline-flex items-center text-bone/70 transition-colors hover:text-bone"
            title={b.name}
          >
            <svg
              viewBox="0 0 24 24"
              role="img"
              aria-label={b.name}
              className="h-16 w-16 fill-current md:h-20 md:w-20"
            >
              <path d={b.path!} />
            </svg>
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setPaused((v) => !v)}
        aria-pressed={paused}
        className="absolute right-3 top-1/2 -translate-y-1/2 border border-line/60 bg-ink/70 px-2 py-1 font-mono text-[10px] uppercase tracking-wider text-faint backdrop-blur transition-colors hover:text-bone focus-visible:text-bone"
      >
        {paused
          ? pick(lang, "Συνέχεια", "Play")
          : pick(lang, "Παύση", "Pause")}
      </button>
    </div>
  );
}
