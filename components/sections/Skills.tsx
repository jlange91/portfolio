"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
import RadarChart from "@/components/ui/RadarChart";
import { skillCategories } from "@/lib/data/skills";

const categoryIcons: Record<string, string> = {
  frontend: "◈",
  frameworks: "⬡",
  build: "⚙",
  architecture: "⬢",
  backend: "◉",
  cloud: "☁",
  other: "◎",
};

export default function Skills() {
  const t = useTranslations("skills");
  const shouldReduce = useReducedMotion();

  const radarPoints = skillCategories.map((c) => ({
    label: t(`items.${c.id}.radarLabel`),
    value: c.level,
  }));

  return (
    <Section id="competences" number="02" title={t("sectionTitle")}>
      <div className="flex justify-center mb-10">
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="
            w-full max-w-sm
            rounded-2xl p-6
            dark:bg-slate-800/40 bg-slate-50
            border dark:border-slate-700/60 border-slate-200
          "
        >
          <RadarChart points={radarPoints} ariaLabel={t("ariaChart")} />
        </motion.div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {skillCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
            className="
              card-hover rounded-xl p-5
              dark:bg-slate-800/40 bg-slate-50
              border dark:border-slate-700/60 border-slate-200
            "
          >
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-accent font-mono text-lg" aria-hidden="true">
                  {categoryIcons[category.id] ?? "◆"}
                </span>
                <h3 className="text-sm font-semibold dark:text-slate-200 text-slate-800 tracking-wide">
                  {t(`items.${category.id}.name`)}
                </h3>
              </div>
              <span className="font-mono text-xs text-accent tabular-nums">{category.level}%</span>
            </div>

            <div
              className="h-0.5 rounded-full dark:bg-slate-700 bg-slate-200 mb-4 overflow-hidden"
              aria-hidden="true"
            >
              <motion.div
                className="h-full rounded-full bg-accent"
                initial={{ width: 0 }}
                whileInView={{ width: `${category.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.06, ease: "easeOut" }}
              />
            </div>

            <ul
              role="list"
              className="flex flex-wrap gap-2"
              aria-label={t("ariaSkillsLabel", { name: t(`items.${category.id}.name`) })}
            >
              {category.skills.map((skill) => (
                <li key={skill}>
                  <Badge variant="default">{skill}</Badge>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
