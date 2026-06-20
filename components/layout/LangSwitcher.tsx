"use client";

import { useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

export default function LangSwitcher() {
  const t = useTranslations("langSwitcher");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const other: Locale = locale === "fr" ? "en" : "fr";

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>
  ) => {
    if (isPending) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    startTransition(() => {
      router.replace(pathname, { locale: other });
    });
  };

  return (
    <a
      href={`/${other}${pathname}`}
      onClick={handleClick}
      onKeyDown={(e) => e.key === "Enter" && handleClick(e)}
      aria-label={t("ariaLabel")}
      aria-disabled={isPending}
      className={`
        px-2.5 py-1.5 rounded-md
        font-mono text-xs font-medium tracking-wider
        dark:text-slate-400 text-slate-600
        dark:hover:text-accent hover:text-brand
        dark:hover:bg-slate-800 hover:bg-slate-100
        transition-colors duration-150
        ${isPending ? "opacity-50 pointer-events-none" : ""}
      `}
    >
      {t("switchTo")}
    </a>
  );
}
