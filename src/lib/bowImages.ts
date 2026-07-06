import type { StaticImageData } from "next/image";
import lite from "@/components/lite.png";
import grand from "@/components/grand.png";
import luxe from "@/components/luxe.png";
import allinclusive from "@/components/allinclusive.png";

// Real photo of each bow package on a car, keyed by bow slug.
export const bowImages: Record<string, StaticImageData> = {
  lite,
  grand,
  luxe,
  "all-inclusive": allinclusive,
};
