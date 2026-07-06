import type { Lang } from "./i18n";
import { fmtEur } from "./i18n";

export { fmtEur };

type Bi = { el: string; en: string };
type BiList = { el: string[]; en: string[] };

export type BowColor = {
  id: string;
  name: string;
  hex: string;
  ribbon: string; // secondary tone for the tail
};

export type Bow = {
  slug: string;
  name: string; // LITE / GRAND / LUXE / ALL INCLUSIVE
  tagline: Bi; // short type descriptor
  material: Bi;
  dimensions: string;
  buyPrice: number; // outright purchase, EUR
  rentPrice?: number; // flat rental for the event, EUR (undefined = buy only)
  deposit: number; // refundable, held for rentals
  includes: BiList;
  addOns?: string[]; // ids from addOnCatalog available as paid extras
  bundled?: { id: string; qty?: number }[]; // extras already included, no charge
  freeAtticaShip?: boolean; // delivery within Athens included
  lead: Bi; // order / delivery time
  featured?: boolean;
  tint: string;
};

export type AddOn = {
  id: string;
  label: Bi;
  price: number; // EUR
  perUnit?: boolean; // priced per item (e.g. balloons) rather than flat
};

// Optional extras. What each bow offers is set per-product below; anything an
// ALL INCLUSIVE bundle already covers is not listed as an extra for it.
export const addOnCatalog: Record<string, AddOn> = {
  ribbons: {
    id: "ribbons",
    label: { el: "2 κορδέλες (παρμπρίζ & καπό)", en: "2 ribbons (windshield & hood)" },
    price: 40,
  },
  decoration: {
    id: "decoration",
    label: {
      el: "Στολισμός οχήματος (πριν το event)",
      en: "Car decoration (before the event)",
    },
    price: 29,
  },
  card: {
    id: "card",
    label: { el: "Κάρτα με ευχές", en: "Custom card with wishes" },
    price: 40,
  },
  balloons: {
    id: "balloons",
    label: { el: "Μπαλόνι ηλίου", en: "Helium balloon" },
    price: 5,
    perUnit: true,
  },
  flowers: {
    id: "flowers",
    label: { el: "Λουλούδια", en: "Flowers" },
    price: 0,
  },
};

// Max helium balloons that can be added.
export const MAX_BALLOONS = 10;

export const bowAddOns = (b: Bow): AddOn[] =>
  (b.addOns ?? []).map((id) => addOnCatalog[id]).filter(Boolean);

// Extras already included in the package (shown as chosen, no charge).
export const bowBundled = (b: Bow): { addOn: AddOn; qty: number }[] =>
  (b.bundled ?? [])
    .map((x) => ({ addOn: addOnCatalog[x.id], qty: x.qty ?? 1 }))
    .filter((x) => x.addOn);

// Bows are made in a single colour: Rosso Corsa.
export const bowColor: BowColor = {
  id: "corsa",
  name: "Rosso Corsa",
  hex: "#B01E28",
  ribbon: "#8A1620",
};

// Products and prices mirror nlv.gr/bow4car exactly.
export const bows: Bow[] = [
  {
    slug: "lite",
    name: "LITE",
    tagline: { el: "Χάρτινος φιόγκος", en: "Cardboard bow" },
    material: { el: "Χαρτόνι", en: "Cardboard" },
    dimensions: "Ø 90 cm",
    buyPrice: 49,
    deposit: 0,
    includes: {
      el: ["Χάρτινος φιόγκος 90 cm", "Έτοιμος για το καπό"],
      en: ["90 cm cardboard bow", "Ready for the bonnet"],
    },
    addOns: ["balloons"],
    lead: { el: "Παράδοση 1–2 μέρες", en: "Delivery in 1–2 days" },
    tint: "#EDE9E3",
  },
  {
    slug: "grand",
    name: "GRAND",
    tagline: { el: "Υφασμάτινος φιόγκος", en: "Fabric bow" },
    material: { el: "Ύφασμα με αφρολέξ", en: "Fabric with foam core" },
    dimensions: "120 × 95 × 20 cm",
    buyPrice: 129,
    rentPrice: 99,
    deposit: 100,
    includes: {
      el: ["Χειροποίητος υφασμάτινος φιόγκος", "Ρυθμιζόμενοι ιμάντες για καπό & οροφή"],
      en: ["Handmade fabric bow", "Adjustable straps for bonnet & roof"],
    },
    addOns: ["ribbons", "decoration", "balloons"],
    lead: { el: "Παράδοση 2–3 μέρες", en: "Delivery in 2–3 days" },
    featured: true,
    tint: "#B01E28",
  },
  {
    slug: "luxe",
    name: "LUXE",
    tagline: { el: "Υφασμάτινος φιόγκος", en: "Fabric bow" },
    material: { el: "Ύφασμα με αφρολέξ", en: "Fabric with foam core" },
    dimensions: "100 × 95 × 25 cm",
    buyPrice: 179,
    rentPrice: 119,
    deposit: 100,
    includes: {
      el: ["Μεγάλος φιόγκος βιτρίνας", "Ρυθμιζόμενοι ιμάντες"],
      en: ["Large showpiece bow", "Adjustable straps"],
    },
    addOns: ["decoration", "card", "balloons"],
    lead: { el: "Παράδοση 2–3 μέρες", en: "Delivery in 2–3 days" },
    tint: "#C6A15B",
  },
  {
    slug: "all-inclusive",
    name: "ALL INCLUSIVE",
    tagline: { el: "Το πλήρες πακέτο", en: "The full package" },
    material: { el: "Ύφασμα με αφρολέξ", en: "Fabric with foam core" },
    dimensions: "100 × 95 × 30 cm",
    buyPrice: 249,
    rentPrice: 159,
    deposit: 120,
    includes: {
      el: [
        "2 κορδέλες (παρμπρίζ & καπό)",
        "Δωρεάν στολισμός οχήματος",
        "10 μπαλόνια ηλίου",
        "Λουλούδια",
        "Δωρεάν παράδοση εντός Αθηνών",
      ],
      en: [
        "2 ribbons (windshield & hood)",
        "Free car decoration",
        "10 helium balloons",
        "Flowers",
        "Free delivery within Athens",
      ],
    },
    addOns: ["card"],
    bundled: [
      { id: "ribbons" },
      { id: "decoration" },
      { id: "balloons", qty: 10 },
      { id: "flowers" },
    ],
    freeAtticaShip: true,
    lead: { el: "Παράδοση 3–5 μέρες", en: "Delivery in 3–5 days" },
    featured: true,
    tint: "#B01E28",
  },
];

export const getBow = (slug: string) => bows.find((b) => b.slug === slug);

// Lowest rental price across the range - used in the marketing copy.
export const minRent = () =>
  Math.min(...bows.filter((b) => b.rentPrice).map((b) => b.rentPrice!));

// Delivery: Attica flat rate; rest of Greece courier. Pickup at the Vari
// showroom is always free. Rentals add a return leg.
export const shipping = {
  attica: 15,
  greece: 25,
  islands: 35,
  pickup: 0,
} as const;

export type ShipZone = keyof typeof shipping;

export const shipZoneLabel = (z: ShipZone, lang: Lang) =>
  ({
    el: {
      attica: "Αττική",
      greece: "Ηπειρωτική Ελλάδα",
      islands: "Νησιά",
      pickup: "Παραλαβή από Βάρη",
    },
    en: {
      attica: "Attica",
      greece: "Mainland Greece",
      islands: "Islands",
      pickup: "Pickup from Vari",
    },
  })[lang][z];
