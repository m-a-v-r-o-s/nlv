import { Car } from "@/lib/cars";

// Cinematic placeholder: a low silhouette on a tinted gradient stage with the
// marque set large behind it. Swap for real photography by dropping an <Image>
// in place of this component - the aspect box stays identical.
export function CarArt({ car, className = "" }: { car: Car; className?: string }) {
  const id = car.slug;
  return (
    <svg
      viewBox="0 0 800 500"
      className={className}
      role="img"
      aria-label={`${car.make} ${car.model} ${car.year}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id={`bg-${id}`} cx="50%" cy="34%" r="85%">
          <stop offset="0%" stopColor={car.tint} stopOpacity="0.55" />
          <stop offset="45%" stopColor="#141417" stopOpacity="1" />
          <stop offset="100%" stopColor="#0B0B0D" stopOpacity="1" />
        </radialGradient>
        <linearGradient id={`floor-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#000" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      <rect width="800" height="500" fill={`url(#bg-${id})`} />

      {/* marque wordmark, oversized and dim, behind the car */}
      <text
        x="400"
        y="230"
        textAnchor="middle"
        fontFamily="Fraunces, Georgia, serif"
        fontSize="120"
        fontWeight="600"
        fill="#EDE9E3"
        opacity="0.05"
        letterSpacing="4"
      >
        {car.make.split(" ")[0].toUpperCase()}
      </text>

      {/* stylised low car silhouette */}
      <g transform="translate(400 320)">
        <ellipse cx="0" cy="70" rx="255" ry="26" fill="#000" opacity="0.5" />
        <path
          d="M-235 30
             C-225 5 -200 -6 -170 -10
             C-150 -34 -120 -50 -70 -54
             L70 -54
             C120 -50 160 -30 195 -8
             C220 -4 236 6 240 30
             C242 44 236 52 224 52
             L-224 52
             C-236 52 -240 44 -235 30 Z"
          fill={car.tint}
          opacity="0.85"
        />
        <path
          d="M-140 -14 C-120 -40 -95 -50 -60 -52 L60 -52 C110 -48 150 -30 176 -12 Z"
          fill="#EDE9E3"
          opacity="0.08"
        />
        {/* wheels */}
        <circle cx="-150" cy="52" r="34" fill="#0B0B0D" />
        <circle cx="-150" cy="52" r="34" fill="none" stroke={car.tint} strokeWidth="3" opacity="0.7" />
        <circle cx="150" cy="52" r="34" fill="#0B0B0D" />
        <circle cx="150" cy="52" r="34" fill="none" stroke={car.tint} strokeWidth="3" opacity="0.7" />
        {/* light streak */}
        <rect x="205" y="0" width="30" height="9" rx="4" fill="#EDE9E3" opacity="0.5" />
        <rect x="-235" y="2" width="22" height="8" rx="4" fill={car.tint} opacity="0.9" />
      </g>

      <rect y="360" width="800" height="140" fill={`url(#floor-${id})`} />
    </svg>
  );
}
