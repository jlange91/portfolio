"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import TimelineItem from "@/components/ui/TimelineItem";
import Badge from "@/components/ui/Badge";
import { experiences } from "@/lib/data/experiences";

export default function Experience() {
  const t = useTranslations("experience");
  const shouldReduce = useReducedMotion();

  const fnacStats = [
    { value: "~100k", ...(t.raw("stats.search") as { label: string; sub: string }) },
    { value: "~50k", ...(t.raw("stats.home") as { label: string; sub: string }) },
    { value: "~50", ...(t.raw("stats.smile") as { label: string; sub: string }) },
    { value: "8", ...(t.raw("stats.markets") as { label: string; sub: string }) },
  ];

  return (
    <Section id="experiences" number="01" title={t("sectionTitle")} alternate>
      <div className="relative">
        {experiences.map((exp, index) => (
          <TimelineItem key={exp.id} index={index} isLast={index === experiences.length - 1}>
            <div className="mb-4">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-xl md:text-2xl font-bold dark:text-slate-100 text-slate-900">
                  {exp.company}
                </h3>
                <span className="font-mono text-xs px-2 py-0.5 rounded bg-brand/10 text-brand dark:text-accent border border-brand/20">
                  {exp.type}
                </span>
              </div>
              <p className="mt-0.5 text-base font-semibold dark:text-slate-300 text-slate-700">
                {t(`items.${exp.id}.role`)}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-sm dark:text-slate-500 text-slate-500 font-mono">
                <span>
                  {exp.startDate} — {exp.endDate}
                </span>
                <span aria-hidden="true">·</span>
                <span>{exp.location}</span>
              </div>
            </div>

            <p className="text-sm dark:text-slate-400 text-slate-600 leading-relaxed mb-5 max-w-3xl">
              {t(`items.${exp.id}.pitch`)}
            </p>

            {exp.id === "fnac-darty" && (
              <motion.div
                initial={{ opacity: 0, y: shouldReduce ? 0 : 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4 }}
                className="mb-5"
              >
                <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {fnacStats.map((stat) => (
                    <div
                      key={stat.label + stat.sub}
                      className="rounded-xl p-4 dark:bg-slate-800/60 bg-white border dark:border-slate-700/60 border-slate-200 text-center"
                    >
                      <dt className="text-2xl font-extrabold gradient-text leading-none">
                        {stat.value}
                      </dt>
                      <dd className="mt-1.5 font-mono text-[10px] dark:text-slate-400 text-slate-600 uppercase tracking-wide leading-tight">
                        {stat.label}
                        <br />
                        <span className="dark:text-slate-600 text-slate-400 normal-case not-italic">
                          {stat.sub}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            )}

            {exp.image && (
              <motion.figure
                initial={{ opacity: 0, y: shouldReduce ? 0 : 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45 }}
                className="mb-5 overflow-hidden rounded-xl relative max-w-2xl"
              >
                <Image
                  src={exp.image}
                  alt={t(`items.${exp.id}.imageAlt`)}
                  width={800}
                  height={360}
                  className="w-full h-44 sm:h-52 object-cover"
                />
                <figcaption className="absolute bottom-0 left-0 right-0 px-3 py-2 text-xs dark:text-slate-300 text-slate-100 bg-slate-900/60 backdrop-blur-sm font-mono">
                  {t(`items.${exp.id}.imageCaption`)}
                </figcaption>
              </motion.figure>
            )}

            {exp.highlights.length > 0 && (
              <ul
                role="list"
                className={`grid gap-3 ${exp.highlights.length > 2 ? "sm:grid-cols-2" : "sm:grid-cols-1 max-w-2xl"}`}
              >
                {exp.highlights.map((h, hi) => (
                  <motion.li
                    key={h.id}
                    initial={{ opacity: 0, y: shouldReduce ? 0 : 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.35, delay: hi * 0.07 }}
                    className="card-hover rounded-xl p-4 dark:bg-slate-800/50 bg-slate-50 border dark:border-slate-700/60 border-slate-200"
                  >
                    <p className="text-sm font-semibold dark:text-slate-200 text-slate-800 mb-1.5">
                      {t(`items.${exp.id}.highlights.${h.id}.title`)}
                    </p>
                    <p className="text-xs dark:text-slate-400 text-slate-600 leading-relaxed mb-3">
                      {t(`items.${exp.id}.highlights.${h.id}.description`)}
                    </p>
                    <div
                      className="flex flex-wrap gap-1.5"
                      role="list"
                      aria-label={t("ariaTagsLabel")}
                    >
                      {h.tags.map((tag) => (
                        <Badge key={tag} variant="default">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </motion.li>
                ))}
              </ul>
            )}
          </TimelineItem>
        ))}
      </div>
    </Section>
  );
}
