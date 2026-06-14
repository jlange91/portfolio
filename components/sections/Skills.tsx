"use client";

import { motion, useReducedMotion } from "framer-motion";
import Section from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
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
  const shouldReduce = useReducedMotion();

  return (
    <Section id="competences" number="02" title="Compétences">
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
            <div className="flex items-center gap-2 mb-4">
              <span className="text-accent font-mono text-lg" aria-hidden="true">
                {categoryIcons[category.id] ?? "◆"}
              </span>
              <h3 className="text-sm font-semibold dark:text-slate-200 text-slate-800 tracking-wide">
                {category.name}
              </h3>
            </div>
            <ul role="list" className="flex flex-wrap gap-2" aria-label={`Compétences : ${category.name}`}>
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
