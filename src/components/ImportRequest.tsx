"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { type Lang, pick } from "@/lib/i18n";

export function ImportRequest({ lang }: { lang: Lang }) {
  const [f, setF] = useState({
    make: "",
    budget: "",
    year: "",
    notes: "",
    name: "",
    phone: "",
  });
  const [sent, setSent] = useState(false);

  const ready = f.make.trim() && f.name.trim() && f.phone.trim();

  function submit() {
    // Lead pipeline integration point: POST to CRM / email.
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-gold/40 bg-carbon p-8 text-center md:p-12">
        <h2 className="font-display text-3xl text-bone">
          {pick(lang, "Λάβαμε το αίτημα", "We got your request")}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-mute">
          {pick(
            lang,
            `${f.name}, ξεκινάμε την αναζήτηση για ${f.make}. Θα σε καλέσουμε στο ${f.phone} με τις πρώτες επιλογές και πλήρες κόστος.`,
            `${f.name}, we're starting the search for ${f.make}. We'll call you on ${f.phone} with the first options and the full cost.`
          )}
        </p>
        <a href={`tel:${site.phoneHref}`} className="btn-gold mt-8">
          {pick(lang, "Ή κάλεσέ μας τώρα", "Or call us now")}
        </a>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-carbon p-7 md:p-9">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label={pick(lang, "Μάρκα & μοντέλο", "Make & model")}
          placeholder={pick(lang, "π.χ. BMW X5 M Competition", "e.g. BMW X5 M Competition")}
          value={f.make}
          onChange={(v) => setF({ ...f, make: v })}
          className="sm:col-span-2"
        />
        <Input
          label={pick(lang, "Προϋπολογισμός", "Budget")}
          placeholder={pick(lang, "π.χ. έως 80.000 €", "e.g. up to €80,000")}
          value={f.budget}
          onChange={(v) => setF({ ...f, budget: v })}
        />
        <Input
          label={pick(lang, "Έτος / χλμ", "Year / km")}
          placeholder={pick(lang, "π.χ. 2021+, έως 40.000 χλμ", "e.g. 2021+, up to 40,000 km")}
          value={f.year}
          onChange={(v) => setF({ ...f, year: v })}
        />
        <label className="block sm:col-span-2">
          <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-faint">
            {pick(lang, "Εξοπλισμός / σημειώσεις", "Options / notes")}
          </span>
          <textarea
            rows={3}
            placeholder={pick(lang, "Χρώμα, εξοπλισμός, προτιμήσεις…", "Colour, options, preferences…")}
            value={f.notes}
            onChange={(e) => setF({ ...f, notes: e.target.value })}
            className="w-full rounded-xl border border-line bg-ink px-4 py-3 text-[15px] text-bone placeholder:text-faint focus-visible:border-gold"
          />
        </label>
        <Input
          label={pick(lang, "Όνομα", "Name")}
          placeholder={pick(lang, "Ονοματεπώνυμο", "Full name")}
          value={f.name}
          onChange={(v) => setF({ ...f, name: v })}
        />
        <Input
          label={pick(lang, "Τηλέφωνο", "Phone")}
          placeholder={pick(lang, "Τηλέφωνο", "Phone")}
          value={f.phone}
          onChange={(v) => setF({ ...f, phone: v })}
        />
      </div>

      <button
        onClick={submit}
        disabled={!ready}
        className="btn-gold mt-7 w-full disabled:cursor-not-allowed disabled:opacity-40"
      >
        {pick(lang, "Ξεκίνα την αναζήτηση", "Start the search")}
      </button>
      <p className="mt-4 text-center text-[12px] text-faint">
        {pick(
          lang,
          "Χωρίς δέσμευση. Σου παρουσιάζουμε πλήρες κόστος πριν προχωρήσεις.",
          "No commitment. We present the full cost before you proceed."
        )}
      </p>
    </div>
  );
}

function Input({
  label,
  placeholder,
  value,
  onChange,
  className = "",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-faint">
        {label}
      </span>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-line bg-ink px-4 py-3 text-[15px] text-bone placeholder:text-faint focus-visible:border-gold"
      />
    </label>
  );
}
