import Link from "next/link";
import { Car, fmtEur, fmtNum, carHeadline, fuelLabel, statusLabel } from "@/lib/cars";
import { type Lang, pick } from "@/lib/i18n";
import { CarArt } from "./CarArt";

export function CarCard({ car, lang }: { car: Car; lang: Lang }) {
  return (
    <Link
      href={`/inventory/${car.slug}`}
      className="card group block focus-visible:outline-none"
    >
      {/* One hover signal only: the card's border warms. The art doesn't also
          scale. Two signals for one intent is noise. */}
      <div className="relative aspect-[8/5] overflow-hidden">
        <CarArt car={car} className="h-full w-full" />
        <div className="absolute left-4 top-4 flex items-center gap-2">
          <span className="num bg-ink/70 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-bone backdrop-blur">
            {car.year}
          </span>
          {car.status !== "available" && (
            <span className="bg-corsa px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-bone">
              {statusLabel(car.status, lang)}
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl leading-tight text-bone">
              {car.make} <span className="text-mute">{car.model}</span>
            </h3>
            <p className="mt-1 line-clamp-1 text-[13px] text-mute">
              {carHeadline(car, lang)}
            </p>
          </div>
          <p className="num whitespace-nowrap font-mono text-lg text-gold">
            {fmtEur(car.price, lang)}
          </p>
        </div>

        <dl className="mt-5 grid grid-cols-4 gap-2 border-t border-line pt-4">
          <Spec k={pick(lang, "χλμ", "km")} v={fmtNum(car.km, lang)} />
          <Spec k="cc" v={fmtNum(car.cc, lang)} />
          <Spec k="hp" v={String(car.hp)} />
          <Spec k={pick(lang, "καύσ.", "fuel")} v={fuelLabel(car.fuel, lang).split(" ")[0]} />
        </dl>
      </div>
    </Link>
  );
}

function Spec({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dd className="num font-mono text-[13px] text-bone">{v}</dd>
      <dt className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-faint">
        {k}
      </dt>
    </div>
  );
}
