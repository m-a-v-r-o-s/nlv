import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieNotice } from "@/components/CookieNotice";
import { Assistant } from "@/components/Assistant";
import { getLang } from "@/lib/lang";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: site.name,
  },
  description:
    "Premium εισαγμένα αυτοκίνητα και εισαγωγή κατά παραγγελία από Ευρώπη. Αθήνα, Αττική.",
  keywords: [
    "αυτοκίνητα",
    "εισαγωγή αυτοκινήτου",
    "εισαγμένα αυτοκίνητα",
    "premium cars",
    "car import Greece",
    "Αθήνα",
    site.name,
  ],
  openGraph: {
    title: site.name,
    description:
      "Premium εισαγμένα αυτοκίνητα και εισαγωγή κατά παραγγελία από Ευρώπη.",
    type: "website",
    locale: "el_GR",
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = await getLang();
  return (
    <html lang={lang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        {/* Loaded at runtime (not build) so offline/sandbox builds stay clean. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Header lang={lang} />
        <main>{children}</main>
        <Footer lang={lang} />
        <Assistant lang={lang} />
        <CookieNotice lang={lang} />
      </body>
    </html>
  );
}
