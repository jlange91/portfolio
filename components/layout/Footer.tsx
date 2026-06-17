import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/data/site";

export default async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="dark:bg-slate-950 bg-slate-100 dark:border-slate-800 border-slate-200 border-t py-8"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm dark:text-slate-500 text-slate-500 font-mono">
          © {year} Julien Lange
        </p>
        <p className="text-sm dark:text-slate-600 text-slate-400 font-mono text-center">
          {t("built")}
        </p>
        <div className="flex items-center gap-4">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("ariaGithub")}
            className="text-sm dark:text-slate-500 text-slate-500 dark:hover:text-accent hover:text-brand transition-colors"
          >
            GitHub
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("ariaLinkedin")}
            className="text-sm dark:text-slate-500 text-slate-500 dark:hover:text-accent hover:text-brand transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            aria-label={t("ariaEmail")}
            className="text-sm dark:text-slate-500 text-slate-500 dark:hover:text-accent hover:text-brand transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
