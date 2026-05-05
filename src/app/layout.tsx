import type { Metadata } from "next";
import { Inter, Oswald, Playfair_Display, Roboto_Mono, Manrope, Montserrat, Lora } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { PWARegistration } from "@/components/pwa-registration";
import { PWAInstallPrompt } from "@/components/pwa-install-prompt";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter", display: "swap" });
const oswald = Oswald({ subsets: ["latin", "cyrillic"], variable: "--font-oswald", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin", "cyrillic"], variable: "--font-playfair", display: "swap" });
const robotoMono = Roboto_Mono({ subsets: ["latin", "cyrillic"], variable: "--font-mono", display: "swap" });
const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-manrope", display: "swap" });
const montserrat = Montserrat({ subsets: ["latin", "cyrillic"], variable: "--font-montserrat", display: "swap" });
const lora = Lora({ subsets: ["latin", "cyrillic"], variable: "--font-lora", display: "swap" });

export const metadata: Metadata = {
  title: "VibeTodo",
  description: "Premium Minimalist Todo App",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "VibeTodo",
  },
  icons: {
    icon: "/icon-192.png",
    apple: "/icon-512.png",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/icon-512.png" sizes="512x512" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="VibeTodo" />
      </head>
      <body
        className={`${inter.variable} ${oswald.variable} ${playfair.variable} ${robotoMono.variable} ${manrope.variable} ${montserrat.variable} ${lora.variable} antialiased`}
      >
        <Providers>
          <PWARegistration />
          <PWAInstallPrompt />
          {children}
        </Providers>
      </body>
    </html>
  );
}
