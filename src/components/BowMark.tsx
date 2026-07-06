// The signature device: a satin bow rosette. Used small as a brand mark and
// large as the φιόγκος product hero. Color is driven so it can carry the
// meaning of the section (corsa red for gifting, gold for premium).
export function BowMark({
  size = 28,
  color = "#B01E28",
  ribbon = "#8A1620",
  tails = false,
  className = "",
}: {
  size?: number;
  color?: string;
  ribbon?: string;
  tails?: boolean;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
    >
      {tails && (
        <>
          <path d="M46 54 L30 96 L44 88 L50 60 Z" fill={ribbon} />
          <path d="M54 54 L70 96 L56 88 L50 60 Z" fill={ribbon} />
        </>
      )}
      {/* left loop */}
      <path
        d="M50 50 C30 30 6 34 8 52 C6 70 34 70 50 52 Z"
        fill={color}
      />
      <path d="M50 50 C34 42 18 46 12 54" fill="none" stroke={ribbon} strokeWidth="2" opacity="0.6" />
      {/* right loop */}
      <path
        d="M50 50 C70 30 94 34 92 52 C94 70 66 70 50 52 Z"
        fill={color}
      />
      <path d="M50 50 C66 42 82 46 88 54" fill="none" stroke={ribbon} strokeWidth="2" opacity="0.6" />
      {/* knot */}
      <ellipse cx="50" cy="51" rx="10" ry="12" fill={ribbon} />
      <ellipse cx="50" cy="49" rx="7" ry="9" fill={color} />
    </svg>
  );
}
