import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { getLocales } from "../lib/db";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  let title = "S.A.I. - Salute, Ambiente, Igiene | Sicurezza sul Lavoro e HACCP Napoli";
  let description = "Da oltre 20 anni leader a Napoli nella consulenza per la Sicurezza sul Lavoro (D.Lgs. 81/08), Sicurezza Alimentare (HACCP), Analisi Legionella, Gas Radon e Formazione Professionale Certificata.";
  let keywords = "Sicurezza sul lavoro Napoli, HACCP Napoli, Consulenza sicurezza aziendale, Legionella Napoli, Radon Campania, Corsi di formazione sicurezza";
  let favicon = "/logo.png";
  let googleSearchConsole = "";

  try {
    const locales = await getLocales();
    if (locales.seo?.global?.title) title = locales.seo.global.title;
    if (locales.seo?.global?.description) description = locales.seo.global.description;
    if (locales.seo?.global?.keywords) keywords = locales.seo.global.keywords;
    if (locales.azienda?.favicon) favicon = locales.azienda.favicon;
    if (locales.seo?.integrations?.google_search_console) {
      googleSearchConsole = locales.seo.integrations.google_search_console;
    }
  } catch (err) {
    console.error("Error generating dynamic metadata:", err);
  }

  return {
    title,
    description,
    keywords,
    icons: {
      icon: favicon,
      shortcut: favicon,
      apple: favicon,
    },
    verification: googleSearchConsole ? {
      google: googleSearchConsole,
    } : undefined,
  };
}

import CookieBanner from "@/components/CookieBanner";
import Footer from "@/components/Footer";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locales = await getLocales();
  
  let googleAnalyticsId = "";
  if (locales.seo?.integrations?.google_analytics) {
    googleAnalyticsId = locales.seo.integrations.google_analytics;
  }

  // Schema.org structured data (JSON-LD) for Search Engines & LLMs
  const companyName = locales.azienda?.name || "S.A.I. s.r.l.";
  const companyAddress = locales.azienda?.address || "Via Luigi La Vista, 5 - 80122 Napoli (NA) ITALY";
  const companyEmail = locales.azienda?.email || "saluteambienteigiene@gmail.com";
  const companyPhone = locales.azienda?.phone_mobile || locales.azienda?.phone || "+39 393 88 79 849";
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": companyName,
    "image": "https://sainapoli.it/logo.png",
    "description": locales.seo?.global?.description || "Da oltre 20 anni leader a Napoli nella consulenza per la Sicurezza sul Lavoro, HACCP, Legionella e Formazione.",
    "url": "https://sainapoli.it",
    "telephone": companyPhone,
    "email": companyEmail,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": companyAddress,
      "addressLocality": "Napoli",
      "addressRegion": "NA",
      "postalCode": "80122",
      "addressCountry": "IT"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ]
  };

  return (
    <html
      lang="it"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-sai-green selection:text-white">
        {googleAnalyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
        {children}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}

