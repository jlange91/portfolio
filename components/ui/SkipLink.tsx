import { getTranslations } from "next-intl/server";

export default async function SkipLink() {
  const t = await getTranslations();
  return (
    <a
      href="#main-content"
      className="
        sr-only focus:not-sr-only
        fixed top-4 left-4 z-[9999]
        bg-accent text-slate-900
        px-4 py-2 rounded-md
        font-semibold text-sm
        focus:outline-none focus:ring-2 focus:ring-white
      "
    >
      {t("skipLink")}
    </a>
  );
}
