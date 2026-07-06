"use client";

import { useMemo, useState } from "react";
import {
  Bow,
  bowColor,
  bowAddOns,
  bowBundled,
  MAX_BALLOONS,
  shipping,
  shipZoneLabel,
  ShipZone,
  fmtEur,
} from "@/lib/bows";
import { type Lang, pick } from "@/lib/i18n";
import { BowMark } from "./BowMark";

type Mode = "rent" | "buy";

const todayISO = () => new Date().toISOString().slice(0, 10);

export function BowCheckout({ bow, lang }: { bow: Bow; lang: Lang }) {
  const canRent = !!bow.rentPrice;
  const [mode, setMode] = useState<Mode>(canRent ? "rent" : "buy");
  const color = bowColor;
  const [zone, setZone] = useState<ShipZone>("attica");
  const [date, setDate] = useState("");

  const [form, setForm] = useState({ name: "", phone: "", email: "", note: "" });
  const [placed, setPlaced] = useState(false);

  const availableAddOns = bowAddOns(bow);
  const bundled = bowBundled(bow);
  const [addQty, setAddQty] = useState<Record<string, number>>({});
  const addOnsTotal = availableAddOns.reduce(
    (s, a) => s + (addQty[a.id] ?? 0) * a.price,
    0
  );

  const isPickup = zone === "pickup";
  const freeAttica = !!bow.freeAtticaShip;

  const totals = useMemo(() => {
    const ship = zone === "attica" && freeAttica ? 0 : shipping[zone];
    const isRent = mode === "rent" && !!bow.rentPrice;
    const base = isRent ? bow.rentPrice! : bow.buyPrice;
    const returnShip = isRent && !isPickup ? ship : 0; // courier return leg
    return {
      subtotal: base,
      ship,
      returnShip,
      addOns: addOnsTotal,
      payNow: base + ship + returnShip + addOnsTotal,
    };
  }, [mode, zone, isPickup, bow, freeAttica, addOnsTotal]);

  const contactReady = form.name.trim() !== "" && form.phone.trim() !== "";
  const canSubmit = contactReady && totals.payNow > 0;

  function submit() {
    // Stripe integration point: create a Checkout Session and redirect.
    // Confirm inline for now.
    setPlaced(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  if (placed) {
    return (
      <div className="rounded-2xl border border-gold/40 bg-carbon p-8 text-center md:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold/15">
          <BowMark size={40} color={color.hex} ribbon={color.ribbon} tails />
        </div>
        <h2 className="mt-6 font-display text-3xl text-bone">
          {pick(lang, "Η παραγγελία καταχωρήθηκε", "Your order is in")}
        </h2>
        <p className="mx-auto mt-3 max-w-md text-mute">
          {pick(
            lang,
            `${form.name}, θα επικοινωνήσουμε άμεσα στο ${form.phone} για επιβεβαίωση ${
              mode === "rent" ? "της ενοικίασης" : "της αγοράς"
            } και του τρόπου πληρωμής.`,
            `${form.name}, we'll be in touch shortly on ${form.phone} to confirm the ${
              mode === "rent" ? "rental" : "purchase"
            } and the payment method.`
          )}
        </p>
        <div className="mx-auto mt-8 max-w-sm rounded-xl border border-line bg-ink p-5 text-left">
          <Row k={`${pick(lang, "Φιόγκος", "Bow")} ${bow.name}`} v={color.name} />
          <Row
            k={pick(lang, "Τύπος", "Type")}
            v={mode === "rent" ? pick(lang, "Ενοικίαση", "Rental") : pick(lang, "Αγορά", "Purchase")}
          />
          <Row k={pick(lang, "Παράδοση", "Delivery")} v={shipZoneLabel(zone, lang)} />
          <div className="mt-3 flex justify-between border-t border-line pt-3">
            <span className="font-mono text-[12px] uppercase tracking-wider text-mute">
              {pick(lang, "Σύνολο", "Total")}
            </span>
            <span className="font-mono text-lg text-gold">
              {fmtEur(totals.payNow, lang)}
            </span>
          </div>
        </div>
        <button onClick={() => setPlaced(false)} className="btn-ghost mt-8">
          {pick(lang, "Νέα παραγγελία", "New order")}
        </button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
      {/* Configurator */}
      <div className="space-y-10">
        {/* Mode */}
        {canRent && (
          <Field label={pick(lang, "Θέλω να", "I want to")}>
            <div className="grid grid-cols-2 gap-2">
              {(["rent", "buy"] as Mode[]).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`rounded-xl border p-4 text-left transition-colors ${
                    mode === m
                      ? "border-gold bg-gold/10"
                      : "border-line hover:border-mute"
                  }`}
                >
                  <span className="font-display text-xl text-bone">
                    {m === "rent" ? pick(lang, "Νοικιάσω", "Rent") : pick(lang, "Αγοράσω", "Buy")}
                  </span>
                  <span className="mt-1 block font-mono text-[12px] text-mute">
                    {m === "rent"
                      ? fmtEur(bow.rentPrice!, lang)
                      : `${fmtEur(bow.buyPrice, lang)} ${pick(lang, "εφάπαξ", "one-off")}`}
                  </span>
                </button>
              ))}
            </div>
          </Field>
        )}

        {/* Event date (rental) */}
        {mode === "rent" && canRent && (
          <Field label={pick(lang, "Ημερομηνία παράδοσης", "Delivery date")}>
            <label className="block max-w-xs">
              <span className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-faint">
                {pick(lang, "Πότε τη θέλεις;", "When do you need it?")}
              </span>
              <input
                type="date"
                value={date}
                min={todayISO()}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-xl border border-line bg-carbon px-4 py-3 text-[15px] text-bone [color-scheme:dark] focus-visible:border-gold"
              />
            </label>
          </Field>
        )}

        {/* Add-ons */}
        {(availableAddOns.length > 0 || bundled.length > 0) && (
          <Field label={pick(lang, "Πρόσθετα", "Add-ons")}>
            <div className="space-y-2">
              {bundled.map(({ addOn: a, qty }) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between rounded-xl border border-gold/40 bg-gold/5 p-4"
                >
                  <span className="text-[15px] text-bone">
                    {pick(lang, a.label.el, a.label.en)}
                    {qty > 1 ? ` ×${qty}` : ""}
                  </span>
                  <span className="font-mono text-[12px] uppercase tracking-wider text-gold">
                    ✓ {pick(lang, "Περιλαμβάνεται", "Included")}
                  </span>
                </div>
              ))}
              {availableAddOns.map((a) => {
                const qty = addQty[a.id] ?? 0;
                if (a.perUnit) {
                  return (
                    <div
                      key={a.id}
                      className="flex items-center justify-between rounded-xl border border-line p-4"
                    >
                      <div>
                        <p className="text-[15px] text-bone">
                          {pick(lang, a.label.el, a.label.en)}
                        </p>
                        <p className="font-mono text-[12px] text-mute">
                          {fmtEur(a.price, lang)} {pick(lang, "/ τεμάχιο", "each")}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          aria-label={pick(lang, "Λιγότερα", "Fewer")}
                          onClick={() =>
                            setAddQty((q) => ({
                              ...q,
                              [a.id]: Math.max(0, (q[a.id] ?? 0) - 1),
                            }))
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-bone transition-colors hover:border-gold"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-mono text-bone">
                          {qty}
                        </span>
                        <button
                          type="button"
                          aria-label={pick(lang, "Περισσότερα", "More")}
                          disabled={qty >= MAX_BALLOONS}
                          onClick={() =>
                            setAddQty((q) => ({
                              ...q,
                              [a.id]: Math.min(MAX_BALLOONS, (q[a.id] ?? 0) + 1),
                            }))
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-bone transition-colors hover:border-gold disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  );
                }
                const on = qty > 0;
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => setAddQty((q) => ({ ...q, [a.id]: on ? 0 : 1 }))}
                    className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition-colors ${
                      on ? "border-gold bg-gold/10" : "border-line hover:border-mute"
                    }`}
                  >
                    <span className="text-[15px] text-bone">
                      {pick(lang, a.label.el, a.label.en)}
                    </span>
                    <span className="font-mono text-[13px] text-gold">
                      {on ? "✓ " : "+ "}
                      {fmtEur(a.price, lang)}
                    </span>
                  </button>
                );
              })}
            </div>
          </Field>
        )}

        {/* Delivery */}
        <Field label={pick(lang, "Παράδοση", "Delivery")}>
          <div className="grid gap-2 sm:grid-cols-2">
            {(Object.keys(shipping) as ShipZone[]).map((z) => {
              const cost = z === "attica" && freeAttica ? 0 : shipping[z];
              return (
                <button
                  key={z}
                  onClick={() => setZone(z)}
                  className={`flex items-center justify-between rounded-xl border p-4 text-left transition-colors ${
                    zone === z ? "border-gold bg-gold/10" : "border-line hover:border-mute"
                  }`}
                >
                  <span className="text-[15px] text-bone">{shipZoneLabel(z, lang)}</span>
                  <span className="font-mono text-[13px] text-gold">
                    {cost === 0 ? pick(lang, "Δωρεάν", "Free") : fmtEur(cost, lang)}
                  </span>
                </button>
              );
            })}
          </div>
          {mode === "rent" && !isPickup && (
            <p className="mt-3 flex items-start gap-2 text-[13px] text-mute">
              <span className="text-gold">·</span>
              {pick(
                lang,
                "Στην ενοικίαση με courier χρεώνεται και η επιστροφή. Με παραλαβή από τη Βάρη, η μεταφορά είναι δωρεάν και στα δύο σκέλη.",
                "Courier rentals are charged for the return leg too. With pickup from Vari, transport is free both ways."
              )}
            </p>
          )}
        </Field>

        {/* Contact */}
        <Field label={pick(lang, "Στοιχεία επικοινωνίας", "Contact details")}>
          <div className="grid gap-3 sm:grid-cols-2">
            <TextInput
              placeholder={pick(lang, "Ονοματεπώνυμο", "Full name")}
              value={form.name}
              onChange={(v) => setForm((f) => ({ ...f, name: v }))}
            />
            <TextInput
              placeholder={pick(lang, "Τηλέφωνο", "Phone")}
              value={form.phone}
              onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
            />
            <TextInput
              placeholder={pick(lang, "Email (προαιρετικό)", "Email (optional)")}
              value={form.email}
              onChange={(v) => setForm((f) => ({ ...f, email: v }))}
              className="sm:col-span-2"
            />
            <textarea
              placeholder={pick(lang, "Σημείωση, π.χ. ώρα παράδοσης, όχημα, έκπληξη", "Note, e.g. delivery time, car, surprise")}
              value={form.note}
              onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
              rows={3}
              className="sm:col-span-2 rounded-xl border border-line bg-carbon px-4 py-3 text-[15px] text-bone placeholder:text-faint focus-visible:border-gold"
            />
          </div>
        </Field>
      </div>

      {/* Summary */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-2xl border border-line bg-carbon p-7">
          <div className="flex items-center gap-4">
            <BowMark size={52} color={color.hex} ribbon={color.ribbon} tails />
            <div>
              <p className="font-display text-xl text-bone">
                {pick(lang, "Φιόγκος", "Bow")} {bow.name}
              </p>
              <p className="font-mono text-[12px] text-mute">
                {bow.dimensions} · {color.name}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-2 border-t border-line pt-6">
            {mode === "buy" ? (
              <Row k={pick(lang, "Αγορά", "Purchase")} v={fmtEur(totals.subtotal, lang)} />
            ) : (
              <Row k={pick(lang, "Ενοικίαση", "Rental")} v={fmtEur(totals.subtotal, lang)} />
            )}
            <Row
              k={`${pick(lang, "Μεταφορά", "Delivery")} · ${shipZoneLabel(zone, lang)}`}
              v={totals.ship === 0 ? pick(lang, "Δωρεάν", "Free") : fmtEur(totals.ship, lang)}
            />
            {mode === "rent" && totals.returnShip > 0 && (
              <Row
                k={pick(lang, "Επιστροφή (courier)", "Return (courier)")}
                v={fmtEur(totals.returnShip, lang)}
              />
            )}
            {availableAddOns.map((a) => {
              const qty = addQty[a.id] ?? 0;
              if (!qty) return null;
              return (
                <Row
                  key={a.id}
                  k={`${pick(lang, a.label.el, a.label.en)}${
                    a.perUnit && qty > 1 ? ` ×${qty}` : ""
                  }`}
                  v={fmtEur(a.price * qty, lang)}
                />
              );
            })}
            {bundled.map(({ addOn: a, qty }) => (
              <Row
                key={a.id}
                k={`${pick(lang, a.label.el, a.label.en)}${qty > 1 ? ` ×${qty}` : ""}`}
                v={pick(lang, "Περιλαμβάνεται", "Included")}
                muted
              />
            ))}
          </div>

          <div className="mt-4 flex items-end justify-between border-t border-line pt-4">
            <div>
              <span className="font-mono text-[12px] uppercase tracking-wider text-mute">
                {pick(lang, "Πληρωτέο τώρα", "Pay now")}
              </span>
            </div>
            <span className="font-mono text-2xl text-gold">
              {fmtEur(totals.payNow, lang)}
            </span>
          </div>

          <button
            onClick={submit}
            disabled={!canSubmit}
            className="btn-corsa mt-6 w-full disabled:cursor-not-allowed disabled:opacity-40"
          >
            {mode === "rent"
              ? pick(lang, "Κλείσε τον φιόγκο", "Book the bow")
              : pick(lang, "Ολοκλήρωση αγοράς", "Complete purchase")}
          </button>

          {!canSubmit && (
            <p className="mt-3 text-center text-[12px] text-faint">
              {pick(lang, "Συμπλήρωσε όνομα & τηλέφωνο", "Fill in name & phone")}
            </p>
          )}

          <p className="mt-4 text-center text-[11px] leading-relaxed text-faint">
            {pick(
              lang,
              "Ασφαλής πληρωμή μέσω Stripe. Χωρίς εγγύηση, χωρίς κρυφές χρεώσεις.",
              "Secure payment via Stripe. No deposit, no hidden charges."
            )}
          </p>
        </div>
      </aside>
    </div>
  );
}

/* ── small building blocks ─────────────────────────────────── */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-4">{label}</p>
      {children}
    </div>
  );
}

function Row({ k, v, muted = false }: { k: string; v: string; muted?: boolean }) {
  return (
    <div className="flex items-center justify-between text-[14px]">
      <span className={muted ? "text-faint" : "text-mute"}>{k}</span>
      <span className={`font-mono ${muted ? "text-faint" : "text-bone"}`}>{v}</span>
    </div>
  );
}

function TextInput({
  placeholder,
  value,
  onChange,
  className = "",
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  className?: string;
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`rounded-xl border border-line bg-carbon px-4 py-3 text-[15px] text-bone placeholder:text-faint focus-visible:border-gold ${className}`}
    />
  );
}
