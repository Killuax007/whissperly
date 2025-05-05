import {
  Bricolage_Grotesque,
  Inter,
  Montserrat,
  Poppins,
} from "next/font/google";
import localFont from "next/font/local";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans_init = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono_init = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolage_grotesque_init = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
});

const inter_init = Inter({
  subsets: ["latin"],
  display: "swap",
});
const montserrat_init = Montserrat({
  subsets: ["latin"],
  display: "swap",
});
const poppins_init = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: "500",
});
const chigero_init = localFont({
  src: "../app/fonts/Chigero.woff",
  display: "swap", // optional
});
const cf_init = localFont({
  src: "../app/fonts/Celsius Flower.otf",
  display: "swap",
});
export const Poppins_font = poppins_init.className;
export const GeistMono_font = geistMono_init.className;
export const GeistSans_font = geistSans_init.className;
export const Chigero_font = chigero_init.className;
export const CelciusFlower = cf_init.className;
export const MontSerrat_font = montserrat_init.className;
export const Bricolage_grotesque = bricolage_grotesque_init.className;
export const Inter_font = inter_init.className;
