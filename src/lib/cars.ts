import type { Lang } from "./i18n";
import { fmtEur, fmtNum } from "./i18n";

export { fmtEur, fmtNum };

export type Fuel =
  | "Βενζίνη"
  | "Πετρέλαιο"
  | "Υβριδικό βενζίνη"
  | "Υβριδικό plug-in"
  | "Ηλεκτρικό";

export type Body = "SUV" | "Sedan" | "Coupé" | "Cabrio" | "Hatchback";

export type Gearbox = "Αυτόματο" | "Ημιαυτόματο" | "Χειροκίνητο";

export type Car = {
  slug: string;
  make: string;
  model: string;
  year: number;
  price: number; // EUR
  headline: string; // the dealer's one-line pitch (from the listing)
  headlineEn: string;
  km: number;
  cc: number;
  hp: number;
  gearbox: Gearbox;
  fuel: Fuel;
  body: Body;
  color: string;
  featured?: boolean;
  status: "available" | "reserved" | "sold";
  // brand-tint used by the generated placeholder art until real photos land
  tint: string;
  highlights: string[];
  highlightsEn: string[];
};

// Placeholder stock for this demo build — every listing below is made up.
// Real photography and the actual stock list get dropped into this array later.
export const cars: Car[] = [
  {
    slug: "ferrari-california-2009",
    make: "Ferrari",
    model: "California",
    year: 2009,
    price: 160000,
    headline: "Rosso Corsa · V8 4.3 · Δέρμα · Καμπριό · Πλήρες σέρβις",
    headlineEn: "Rosso Corsa · 4.3 V8 · Leather · Convertible · Full service",
    km: 65500,
    cc: 4297,
    hp: 460,
    gearbox: "Ημιαυτόματο",
    fuel: "Βενζίνη",
    body: "Cabrio",
    color: "Rosso Corsa",
    featured: true,
    status: "available",
    tint: "#B01E28",
    highlights: [
      "V8 4.3L ατμοσφαιρικός",
      "Μεταλλική οροφή coupé-cabrio",
      "Πλήρες ιστορικό σέρβις",
      "Δερμάτινο εσωτερικό",
    ],
    highlightsEn: [
      "Naturally aspirated 4.3L V8",
      "Retractable coupe-cabrio hardtop",
      "Full service history",
      "Leather interior",
    ],
  },
  {
    slug: "mercedes-a35-amg-2025",
    make: "Mercedes-Benz",
    model: "A 35 AMG",
    year: 2025,
    price: 69900,
    headline: "Full Extra · 1.900 χλμ · Εγγύηση · Κατάσταση καινούργιου",
    headlineEn: "Full extras · 1,900 km · Warranty · As new",
    km: 1900,
    cc: 1991,
    hp: 320,
    gearbox: "Αυτόματο",
    fuel: "Υβριδικό βενζίνη",
    body: "Hatchback",
    color: "Cosmos Black",
    featured: true,
    status: "available",
    tint: "#3A3D45",
    highlights: [
      "Εργοστασιακή εγγύηση",
      "AMG performance pack",
      "Μόλις 1.900 χλμ",
      "Full extra εξοπλισμός",
    ],
    highlightsEn: [
      "Factory warranty",
      "AMG performance pack",
      "Just 1,900 km",
      "Full-extra equipment",
    ],
  },
  {
    slug: "bmw-x5-2016-plugin",
    make: "BMW",
    model: "X5 xDrive40e",
    year: 2016,
    price: 32500,
    headline: "Plug-in Hybrid · xDrive · 313 hp · Full βιβλίο service",
    headlineEn: "Plug-in hybrid · xDrive · 313 hp · Full service book",
    km: 75973,
    cc: 1998,
    hp: 313,
    gearbox: "Αυτόματο",
    fuel: "Υβριδικό plug-in",
    body: "SUV",
    color: "Alpine White",
    featured: true,
    status: "available",
    tint: "#4A5560",
    highlights: [
      "Plug-in υβριδικό σύστημα",
      "xDrive τετρακίνηση",
      "Πλήρες βιβλίο σέρβις",
      "313 ίπποι συνδυαστικά",
    ],
    highlightsEn: [
      "Plug-in hybrid system",
      "xDrive all-wheel drive",
      "Full service book",
      "313 hp combined",
    ],
  },
  {
    slug: "bmw-x5-2011-vr4",
    make: "BMW",
    model: "X5 xDrive50i V8",
    year: 2011,
    price: 26500,
    headline: "Θωρακισμένο VR4 · V8 · 500 hp · Ελληνικό",
    headlineEn: "Armoured VR4 · V8 · 500 hp · Greek-owned",
    km: 163000,
    cc: 4395,
    hp: 500,
    gearbox: "Αυτόματο",
    fuel: "Βενζίνη",
    body: "SUV",
    color: "Black Sapphire",
    status: "available",
    tint: "#26282C",
    highlights: [
      "Πιστοποιημένη θωράκιση VR4",
      "Twin-turbo V8 500 hp",
      "Ελληνικής αντιπροσωπείας",
    ],
    highlightsEn: [
      "Certified VR4 armouring",
      "Twin-turbo V8, 500 hp",
      "Greek dealer car",
    ],
  },
  {
    slug: "mercedes-a220-2020",
    make: "Mercedes-Benz",
    model: "A 220",
    year: 2020,
    price: 29900,
    headline: "AMG Line · Πανόραμα · Night Packet · Ελληνικό",
    headlineEn: "AMG Line · Panoramic roof · Night package · Greek-owned",
    km: 137000,
    cc: 1950,
    hp: 190,
    gearbox: "Αυτόματο",
    fuel: "Πετρέλαιο",
    body: "Hatchback",
    color: "Polar White",
    status: "available",
    tint: "#5A5E66",
    highlights: [
      "AMG Line εξοπλισμός",
      "Πανοραμική οροφή",
      "Night package",
      "Ελληνικό βιβλίο",
    ],
    highlightsEn: [
      "AMG Line equipment",
      "Panoramic roof",
      "Night package",
      "Greek service book",
    ],
  },
  {
    slug: "jeep-compass-2022",
    make: "Jeep",
    model: "Compass Limited",
    year: 2022,
    price: 21900,
    headline: 'Facelift · Limited · 19" Ζάντες · Adaptive Cruise',
    headlineEn: 'Facelift · Limited · 19" wheels · Adaptive cruise',
    km: 73000,
    cc: 1332,
    hp: 130,
    gearbox: "Αυτόματο",
    fuel: "Βενζίνη",
    body: "SUV",
    color: "Granite Crystal",
    status: "available",
    tint: "#6B7078",
    highlights: [
      "Facelift μοντέλο",
      'Ζάντες 19"',
      "Adaptive cruise control",
      "Έκδοση Limited",
    ],
    highlightsEn: [
      "Facelift model",
      '19" alloy wheels',
      "Adaptive cruise control",
      "Limited trim",
    ],
  },
  {
    slug: "jaguar-xk-2008",
    make: "Jaguar",
    model: "XK",
    year: 2008,
    price: 27900,
    headline: "Ελληνικής αντιπροσωπείας · 4.2 V8 ατμοσφαιρικός",
    headlineEn: "Greek dealer car · 4.2 naturally aspirated V8",
    km: 224000,
    cc: 4192,
    hp: 300,
    gearbox: "Αυτόματο",
    fuel: "Βενζίνη",
    body: "Coupé",
    color: "Ultimate Black",
    status: "available",
    tint: "#2E3138",
    highlights: [
      "V8 4.2L ατμοσφαιρικός",
      "Ελληνικής αντιπροσωπείας",
      "Grand tourer",
    ],
    highlightsEn: [
      "Naturally aspirated 4.2L V8",
      "Greek dealer car",
      "Grand tourer",
    ],
  },
];

export const getCar = (slug: string) => cars.find((c) => c.slug === slug);

export const featuredCars = () => cars.filter((c) => c.featured);

// ── localisation helpers ─────────────────────────────────────
export const carHeadline = (c: Car, lang: Lang) =>
  lang === "en" ? c.headlineEn : c.headline;

export const carHighlights = (c: Car, lang: Lang) =>
  lang === "en" ? c.highlightsEn : c.highlights;

const fuelEn: Record<Fuel, string> = {
  "Βενζίνη": "Petrol",
  "Πετρέλαιο": "Diesel",
  "Υβριδικό βενζίνη": "Hybrid petrol",
  "Υβριδικό plug-in": "Plug-in hybrid",
  "Ηλεκτρικό": "Electric",
};

const gearboxEn: Record<Gearbox, string> = {
  "Αυτόματο": "Automatic",
  "Ημιαυτόματο": "Semi-automatic",
  "Χειροκίνητο": "Manual",
};

const bodyEn: Partial<Record<Body, string>> = { Cabrio: "Convertible", "Coupé": "Coupe" };

export const fuelLabel = (f: Fuel, lang: Lang) => (lang === "en" ? fuelEn[f] : f);
export const gearboxLabel = (g: Gearbox, lang: Lang) =>
  lang === "en" ? gearboxEn[g] : g;
export const bodyLabel = (b: Body, lang: Lang) =>
  lang === "en" ? bodyEn[b] ?? b : b;

export const statusLabel = (s: Car["status"], lang: Lang) =>
  ({
    el: { available: "Διαθέσιμο", reserved: "Δεσμευμένο", sold: "Πωλήθηκε" },
    en: { available: "Available", reserved: "Reserved", sold: "Sold" },
  })[lang][s];
