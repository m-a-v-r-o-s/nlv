import { cookies } from "next/headers";
import type { Lang } from "./i18n";
import { LANG_COOKIE } from "./i18n";

// Server-only: read the active language from the cookie the header toggle sets.
// Import this from server components only (it pulls in next/headers).
export async function getLang(): Promise<Lang> {
  const value = (await cookies()).get(LANG_COOKIE)?.value;
  return value === "en" ? "en" : "el";
}
