import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "S.A.I. - Salute, Ambiente, Igiene | Sicurezza sul Lavoro e HACCP Napoli",
  description: "Da oltre 20 anni leader a Napoli nella consulenza per la Sicurezza sul Lavoro (D.Lgs. 81/08), Sicurezza Alimentare (HACCP), Analisi Legionella, Gas Radon e Formazione Professionale Certificata.",
  keywords: ["Sicurezza sul lavoro Napoli", "HACCP Napoli", "Consulenza sicurezza aziendale", "Legionella Napoli", "Radon Campania", "Corsi di formazione sicurezza"],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  }
};

import CookieBanner from "@/components/CookieBanner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-sai-green selection:text-white">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
