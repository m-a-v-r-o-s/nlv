// Placeholder brand + contact details for this demo build. Every value here is
// fictional (example.com, a reserved-for-documentation phone range). Swap them
// for the real ones before the site goes live.
export const site = {
  name: "Στεφανίδης ΑΕ",
  short: "Στεφανίδης",
  legalForm: "ΑΕ",
  tagline: {
    el: "Από την Ευρώπη, στα χέρια σου",
    en: "From Europe, into your hands",
  },
  address: {
    street: "Οδός Παραδείγματος 1",
    area: "Αθήνα",
    postal: "10000",
    region: "Αττική",
  },
  phone: "210 000 0000",
  phoneHref: "+302100000000",
  email: "hello@example.com",
} as const;

export const nav = [
  { href: "/inventory", el: "Εισαγμένα αυτοκίνητα", en: "Imported cars" },
  { href: "/import", el: "Νέα εισαγωγή", en: "New import" },
  { href: "/#contact", el: "Επικοινωνία", en: "Contact" },
] as const;
