import type { Metadata } from "next";
import { Inter, Oswald, Playfair_Display, Roboto_Mono, Manrope, Montserrat, Lora } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter", display: "swap" });
const oswald = Oswald({ subsets: ["latin", "cyrillic"], variable: "--font-oswald", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin", "cyrillic"], variable: "--font-playfair", display: "swap" });
const robotoMono = Roboto_Mono({ subsets: ["latin", "cyrillic"], variable: "--font-mono", display: "swap" });
const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-manrope", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin", "cyrillic"], variable: "--font-montserrat", display: "swap" });
const lora = Lora({ subsets: ["latin", "cyrillic"], variable: "--font-lora", display: "swap" });

export const metadata: Metadata = {
  title: "Todo App",
  description: "A premium full-stack Todo app with theme switching",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${oswald.variable} ${playfair.variable} ${robotoMono.variable} ${manrope.variable} ${montserrat.variable} ${lora.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
