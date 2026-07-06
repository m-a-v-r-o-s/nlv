import { brands } from "@/lib/logos";

// Scrolling brand strip. Uses the `.ticker-track` marquee (translateX 0 -> -50%).
// The list is repeated so one half is always wider than the viewport — that
// keeps the loop seamless with no empty gap when the logos "finish".
export function CarLogos() {
  const logos = brands.filter((b) => b.path); // drop marks we don't have (Cupra, Lexus)
  const loop = [...logos, ...logos, ...logos, ...logos];

  return (
    <div
      id="brand-ticker"
      className="overflow-hidden border-t border-line/30 bg-ink/30 py-6 backdrop-blur-sm"
    >
      <div className="ticker-track items-center">
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
    </div>
  );
}
