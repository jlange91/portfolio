"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { track } from "@vercel/analytics";
import { useTranslations } from "next-intl";
import { siteConfig } from "@/lib/data/site";

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11 } },
};

function makeFadeUp(shouldReduce: boolean | null): Variants {
  return {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };
}

function makeFadeIn(shouldReduce: boolean | null): Variants {
  return {
    hidden: { opacity: 0, scale: shouldReduce ? 1 : 0.97 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  };
}

export default function Hero() {
  const t = useTranslations("hero");
  const tNav = useTranslations("nav");
  const shouldReduce = useReducedMotion();
  const item = makeFadeUp(shouldReduce);
  const photoAnim = makeFadeIn(shouldReduce);

  const stats = [
    { value: "~100k", label: t("stats.views") },
    { value: "8", label: t("stats.markets") },
    { value: "30+", label: t("stats.components") },
  ];

  return (
    <section
      id="accueil"
      aria-label={t("ariaSection")}
      className="relative min-h-screen flex items-center dark:bg-slate-900 bg-slate-50 overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid" aria-hidden="true" />
      <div className="absolute inset-0 hero-gradient" aria-hidden="true" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 w-full">
        <div className="grid lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-center">
          <motion.div variants={stagger} initial="hidden" animate="visible">
            <motion.h1
              variants={item}
              className="text-5xl sm:text-6xl md:text-[68px] font-extrabold tracking-tight leading-[1.03]"
            >
              <span className="dark:text-slate-100 text-slate-900">Julien </span>
              <span className="gradient-text">Lange</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-4 text-base md:text-lg font-mono font-medium dark:text-slate-400 text-slate-600 tracking-tight"
            >
              <span className="text-accent" aria-hidden="true">›</span>{" "}
              {t("role")}{" "}
              <span className="dark:text-slate-600 text-slate-300" aria-hidden="true">·</span>{" "}
              {t("subtitle")}
            </motion.p>

            <motion.p
              variants={item}
              className="mt-5 text-base dark:text-slate-400 text-slate-600 leading-relaxed max-w-xl"
            >
              {t.rich("pitch", {
                strong: (chunks) => (
                  <strong className="dark:text-slate-200 text-slate-800 font-semibold">
                    {chunks}
                  </strong>
                ),
              })}
            </motion.p>

            <motion.dl
              variants={item}
              className="mt-7 grid grid-cols-3 gap-4 max-w-sm"
              aria-label={t("ariaKeyFigures")}
            >
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <dt className="text-2xl font-extrabold gradient-text leading-none">
                    {stat.value}
                  </dt>
                  <dd className="mt-1 font-mono text-[11px] dark:text-slate-500 text-slate-500 tracking-wide uppercase">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </motion.dl>

            <motion.p
              variants={item}
              className="mt-5 flex items-center gap-1.5 text-sm dark:text-slate-500 text-slate-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {t("location")}
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
              <a
                href={tNav("cvPath")}
                download
                onClick={() => track("cv_download")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-brand hover:bg-brand/90 text-white transition-colors shadow-lg shadow-brand/20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                {t("cta.cv")}
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold dark:bg-slate-800 bg-white dark:text-slate-200 text-slate-800 dark:hover:bg-slate-700 hover:bg-slate-100 border dark:border-slate-700 border-slate-200 transition-colors"
              >
                {t("cta.contact")}
              </a>
            </motion.div>

            <motion.div variants={item} className="mt-5 flex items-center gap-4 flex-wrap">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("github_click")}
                aria-label={t("ariaGithub")}
                className="flex items-center gap-1.5 text-sm dark:text-slate-500 text-slate-500 dark:hover:text-accent hover:text-brand transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
              <span className="dark:text-slate-700 text-slate-300" aria-hidden="true">·</span>
              <a
                href={siteConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("linkedin_click")}
                aria-label={t("ariaLinkedin")}
                className="flex items-center gap-1.5 text-sm dark:text-slate-500 text-slate-500 dark:hover:text-accent hover:text-brand transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                LinkedIn
              </a>
              <span className="dark:text-slate-700 text-slate-300" aria-hidden="true">·</span>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm dark:text-slate-500 text-slate-500 dark:hover:text-accent hover:text-brand transition-colors"
              >
                {siteConfig.email}
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            variants={photoAnim}
            initial="hidden"
            animate="visible"
            className="flex justify-center lg:justify-end order-first lg:order-last"
          >
            <div className="relative">
              <div
                className="absolute -inset-px rounded-2xl translate-x-4 translate-y-4 border border-accent/25 dark:border-accent/20 pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 rounded-2xl blur-2xl bg-brand/10 scale-110 -z-10"
                aria-hidden="true"
              />
              <Image
                src="/img/Julien.png"
                alt={t("ariaPhoto")}
                width={380}
                height={460}
                priority
                className="rounded-2xl object-cover w-52 sm:w-64 lg:w-[380px] border dark:border-slate-700/60 border-slate-200 shadow-2xl shadow-black/20"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
          aria-hidden="true"
        >
          <span className="font-mono text-[10px] dark:text-slate-700 text-slate-400 tracking-widest uppercase">
            scroll
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="dark:text-slate-700 text-slate-400"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
