"use client";

import { useMemo, useState } from "react";
import { Car, Body, bodyLabel } from "@/lib/cars";
import { type Lang, pick } from "@/lib/i18n";
import { CarCard } from "./CarCard";

type Sort = "featured" | "price-asc" | "price-desc" | "year-desc" | "km-asc";

const ALL = "__all__";

const sortLabel = (s: Sort, lang: Lang) =>
  ({
    el: {
      featured: "Προτεινόμενα",
      "price-asc": "Τιμή ↑",
      "price-desc": "Τιμή ↓",
      "year-desc": "Νεότερα",
      "km-asc": "Λιγότερα χλμ",
    },
    en: {
      featured: "Featured",
      "price-asc": "Price ↑",
      "price-desc": "Price ↓",
      "year-desc": "Newest",
      "km-asc": "Fewest km",
    },
  })[lang][s];

export function InventoryBrowser({ cars, lang }: { cars: Car[]; lang: Lang }) {
  const makes = useMemo(
    () => [ALL, ...Array.from(new Set(cars.map((c) => c.make)))],
    [cars]
  );
  const bodies = useMemo(
    () => [ALL, ...Array.from(new Set(cars.map((c) => c.body)))],
    [cars]
  );

  const [make, setMake] = useState(ALL);
  const [body, setBody] = useState(ALL);
  const [sort, setSort] = useState<Sort>("featured");

  const result = useMemo(() => {
    let list = cars.filter(
      (c) =>
        (make === ALL || c.make === make) && (body === ALL || c.body === body)
    );
    switch (sort) {
      case "price-asc":
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case "year-desc":
        list = [...list].sort((a, b) => b.year - a.year);
        break;
      case "km-asc":
        list = [...list].sort((a, b) => a.km - b.km);
        break;
      default:
        list = [...list].sort(
          (a, b) => Number(!!b.featured) - Number(!!a.featured)
        );
    }
    return list;
  }, [cars, make, body, sort]);

  const allLabel = pick(lang, "Όλες", "All");
  const optLabel = (v: string, kind: "make" | "body") =>
    v === ALL ? allLabel : kind === "body" ? bodyLabel(v as Body, lang) : v;

  return (
    <>
      {/* Filter bar */}
      <div className="sticky top-16 z-30 -mx-5 mb-10 border-y border-line bg-ink/90 px-5 py-4 backdrop-blur md:top-20 md:mx-0 md:rounded-xl md:border md:px-6">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <Chips
            label={pick(lang, "Μάρκα", "Make")}
            value={make}
            options={makes}
            onChange={setMake}
            render={(o) => optLabel(o, "make")}
          />
          <Chips
            label={pick(lang, "Αμάξωμα", "Body")}
            value={body}
            options={bodies}
            onChange={setBody}
            render={(o) => optLabel(o, "body")}
          />
          <div className="ml-auto flex items-center gap-3">
            <span className="eyebrow-mute hidden sm:inline">
              {pick(lang, "Ταξινόμηση", "Sort")}
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-full border border-line bg-carbon px-4 py-2 font-mono text-[12px] uppercase tracking-wider text-bone focus-visible:border-gold"
            >
              {(["featured", "price-asc", "price-desc", "year-desc", "km-asc"] as Sort[]).map(
                (s) => (
                  <option key={s} value={s} className="bg-carbon">
                    {sortLabel(s, lang)}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
      </div>

      <p className="mb-6 font-mono text-[12px] uppercase tracking-wider text-faint">
        {result.length} {pick(lang, "οχήματα", "cars")}
      </p>

      {result.length === 0 ? (
        <div className="rounded-xl border border-line bg-carbon p-16 text-center">
          <p className="font-display text-2xl text-bone">
            {pick(lang, "Κανένα όχημα με αυτά τα φίλτρα.", "No cars match these filters.")}
          </p>
          <p className="mt-3 text-mute">
            {pick(
              lang,
              "Δοκίμασε άλλον συνδυασμό, ή ζήτησέ το με εισαγωγή κατά παραγγελία.",
              "Try another combination, or request it with import to order."
            )}
          </p>
          <button
            onClick={() => {
              setMake(ALL);
              setBody(ALL);
            }}
            className="btn-ghost mt-8"
          >
            {pick(lang, "Καθάρισε φίλτρα", "Clear filters")}
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {result.map((car) => (
            <CarCard key={car.slug} car={car} lang={lang} />
          ))}
        </div>
      )}
    </>
  );
}

function Chips({
  label,
  value,
  options,
  onChange,
  render,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
  render: (v: string) => string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="eyebrow-mute hidden sm:inline">{label}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            onClick={() => onChange(o)}
            className={`rounded-full border px-4 py-1.5 font-mono text-[12px] uppercase tracking-wider transition-colors ${
              value === o
                ? "border-gold bg-gold text-ink"
                : "border-line text-mute hover:border-mute hover:text-bone"
            }`}
          >
            {render(o)}
          </button>
        ))}
      </div>
    </div>
  );
}
