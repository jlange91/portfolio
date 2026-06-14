import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "@/lib/data/site";
import SkipLink from "@/components/ui/SkipLink";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteConfig.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  keywords: [
    "Julien Lange",
    "développeur JavaScript",
    "freelance",
    "Web Components",
    "Design System",
    "Next.js",
    "Fnac Darty",
    "Île-de-France",
    "fullstack",
    "micro-frontends",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: siteConfig.url },
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.jobTitle,
  url: siteConfig.url,
  email: `mailto:${siteConfig.email}`,
  address: { "@type": "PostalAddress", addressRegion: "Île-de-France", addressCountry: "FR" },
  sameAs: [siteConfig.linkedin, siteConfig.github],
};

/* Inline script prevents flash of wrong theme before React hydrates */
const themeScript = `
(function(){
  try{
    var stored=localStorage.getItem('theme');
    var systemDark=window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark=stored?stored==='dark':systemDark;
    if(isDark){document.documentElement.classList.add('dark');}
    else{document.documentElement.classList.remove('dark');}
  }catch(e){}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${inter.variable} ${jetbrainsMono.variable} dark`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0F172A" />
      </head>
      <body className="min-h-screen antialiased">
        <SkipLink />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
