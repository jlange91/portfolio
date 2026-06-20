import { setRequestLocale, getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/data/site";

export default async function MerciPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ fallback?: string }>;
}) {
  const { locale } = await params;
  const { fallback } = await searchParams;
  setRequestLocale(locale);

  const t = await getTranslations("contact");
  const tMerci = await getTranslations("merci");

  const isFallback = fallback === "1";

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="min-h-screen flex items-center justify-center p-8 dark:bg-slate-900 bg-slate-50"
    >
      <div className="max-w-md w-full text-center">
        <div
          className={`w-16 h-16 rounded-full border flex items-center justify-center mx-auto mb-6 ${
            isFallback ? "bg-accent/10 border-accent/30" : "bg-green-500/10 border-green-500/30"
          }`}
        >
          {isFallback ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent"
              aria-hidden="true"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-green-400"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </div>

        <h1 className="text-2xl font-bold dark:text-slate-100 text-slate-900 mb-3">
          {isFallback ? t("fallback.title") : t("success.title")}
        </h1>
        <p className="dark:text-slate-400 text-slate-600 mb-8">
          {isFallback ? t("fallback.body") : t("success.body")}
        </p>

        {isFallback && (
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-brand hover:bg-brand/90 text-white transition-colors mb-6"
          >
            {t("fallback.cta")}
          </a>
        )}

        <a href={`/${locale}#contact`} className="block text-sm text-accent hover:underline">
          {tMerci("backToSite")}
        </a>
      </div>
    </main>
  );
}
