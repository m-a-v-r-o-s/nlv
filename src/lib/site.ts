export const site = {
  name: "Next Level Vision",
  short: "NLV",
  hashtag: "#BANDITO",
  tagline: "Ζήσε Next Level",
  vat: "", // ΑΦΜ to be provided
  address: {
    street: "Βασ. Κωνσταντίνου 48",
    area: "Βάρη",
    postal: "16672",
    region: "Αττική",
    maps: "https://maps.app.goo.gl/gdMpuAD7L1WcHP1NA",
  },
  phone: "211 42 42 203",
  phoneHref: "+302114242203",
  email: "my.nlv.gr@gmail.com",
  cargr:
    "https://www.car.gr/classifieds/cars/?shop=3560890&shop=477334&uid=477334&utm_source=ig&utm_medium=social",
  socials: {
    instagram: "https://www.instagram.com/bandito_nlv",
    tiktok: "https://www.tiktok.com/@bandito_nlv",
    youtube: "https://www.youtube.com/channel/UCG1jZk6K_WJpqxCcNQZFMBA",
    telegram: "https://t.me/bandito_cars",
    facebook: "https://www.facebook.com/michalis.spas",
  },
} as const;

export const nav = [
  { href: "/inventory", el: "Εισαγμένα αυτοκίνητα", en: "Imported cars" },
  { href: "/import", el: "Νέα εισαγωγή", en: "New import" },
  { href: "/bow4car", el: "Φιόγκος", en: "The Bow" },
  { href: "/#contact", el: "Επικοινωνία", en: "Contact" },
] as const;
