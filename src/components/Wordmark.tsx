import { site } from "@/lib/site";

// Logotype used in the header and footer. Purely typographic — no glyph — so the
// name carries the brand on its own. `size` scales the whole lockup.
export function Wordmark({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const s = {
    sm: { name: "text-lg", sub: "text-[8px]" },
    md: { name: "text-2xl", sub: "text-[9px]" },
    lg: { name: "text-3xl", sub: "text-[10px]" },
  }[size];

  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className={`font-display ${s.name} tracking-tight text-bone`}>
        {site.short}
      </span>
      <span
        className={`mt-1 font-mono ${s.sub} uppercase tracking-widest2 text-mute`}
      >
        {site.legalForm} · Automotive
      </span>
      <span className="sr-only">{site.name}</span>
    </span>
  );
}
