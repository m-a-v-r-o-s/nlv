import Link from "next/link";
import { BowMark } from "@/components/BowMark";
import { getLang } from "@/lib/lang";
import { pick } from "@/lib/i18n";

export default async function NotFound() {
  const lang = await getLang();
  return (
    <div className="flex min-h-[70svh] items-center justify-center pt-20">
      <div className="shell text-center">
        <BowMark size={56} color="#C6A15B" ribbon="#9C7C3E" tails className="mx-auto" />
        <h1 className="mt-6 font-display text-5xl text-bone">404</h1>
        <p className="mt-3 text-mute">
          {pick(lang, "Η σελίδα δεν βρέθηκε.", "Page not found.")}
        </p>
        <Link href="/" className="btn-gold mt-8">
          {pick(lang, "Επιστροφή", "Back home")}
        </Link>
      </div>
    </div>
  );
}
