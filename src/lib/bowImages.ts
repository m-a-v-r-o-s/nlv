import type { StaticImageData } from "next/image";
import lite from "@/components/lite.webp";
import grand from "@/components/grand.webp";
import luxe from "@/components/luxe.webp";
import allinclusive from "@/components/allinclusive.webp";

// Real photo of each bow package on a car, keyed by bow slug.
export const bowImages: Record<string, StaticImageData> = {
  lite,
  grand,
  luxe,
  "all-inclusive": allinclusive,
};
