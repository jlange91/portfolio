"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import { educationItems } from "@/lib/data/education";

export default function Education() {
  const t = useTranslations("education");
  const shouldReduce = useReducedMotion();
  const degrees = educationItems.filter((e) => e.type === "degree");
  const certs = educationItems.filter((e) => e.type === "certification");

  return (
    <Section id="formation" number="04" title={t("sectionTitle")}>
      <div className="mb-10">
        <h3 className="font-mono text-xs text-accent tracking-widest uppercase mb-5 flex items-center gap-2">
          <span aria-hidden="true">◈</span> {t("degreesHeading")}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {degrees.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="
                card-hover rounded-xl p-5
                dark:bg-slate-800/40 bg-slate-50
                border dark:border-slate-700/60 border-slate-200
              "
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <h4 className="text-sm font-bold dark:text-slate-100 text-slate-900">
                  {item.institution}
                </h4>
                <span className="font-mono text-xs dark:text-slate-500 text-slate-400 shrink-0">
                  {item.period}
                </span>
              </div>
              <p className="text-sm font-medium dark:text-accent text-brand mb-2">
                {t(`items.${item.id}.degree`)}
              </p>
              <p className="text-xs dark:text-slate-400 text-slate-600 leading-relaxed">
                {t(`items.${item.id}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-mono text-xs text-accent tracking-widest uppercase mb-5 flex items-center gap-2">
          <span aria-hidden="true">◎</span> {t("certsHeading")}
        </h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {certs.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: index * 0.07 }}
              className="
                card-hover rounded-xl p-4
                dark:bg-slate-800/40 bg-slate-50
                border dark:border-slate-700/60 border-slate-200
              "
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span className="font-mono text-xs dark:text-accent text-brand font-medium">
                  {item.period}
                </span>
              </div>
              <p className="text-sm font-semibold dark:text-slate-200 text-slate-800 mb-1">
                {t(`items.${item.id}.degree`)}
              </p>
              <p className="font-mono text-xs dark:text-slate-500 text-slate-500 mb-2">
                {item.institution}
              </p>
              <p className="text-xs dark:text-slate-400 text-slate-600 leading-relaxed">
                {t(`items.${item.id}.description`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
