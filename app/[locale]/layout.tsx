import type { Metadata } from "next";
import Script from "next/script";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/data/site";
import SkipLink from "@/components/ui/SkipLink";
import HtmlLang from "@/components/ui/HtmlLang";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site" });

  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: t("title"),
      description: t("description"),
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: t("title") }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/opengraph-image"],
    },
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    keywords: t.raw("keywords") as string[],
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: {
        fr: `${siteConfig.url}/fr`,
        en: `${siteConfig.url}/en`,
      },
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "site" });

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    jobTitle: t("jobTitle"),
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    address: { "@type": "PostalAddress", addressRegion: "Île-de-France", addressCountry: "FR" },
    sameAs: [siteConfig.linkedin, siteConfig.github],
  };

  return (
    <>
      <HtmlLang locale={locale} />
      <Script
        id="ld-json"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        strategy="afterInteractive"
      />
      <NextIntlClientProvider messages={messages}>
        <SkipLink />
        {children}
      </NextIntlClientProvider>
    </>
  );
}
