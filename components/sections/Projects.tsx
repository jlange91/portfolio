"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
import { projects } from "@/lib/data/projects";

export default function Projects() {
  const t = useTranslations("projects");
  const shouldReduce = useReducedMotion();

  return (
    <Section id="projets" number="03" title={t("sectionTitle")} alternate>
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project, index) => {
          const title = t(`items.${project.id}.title`);
          return (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
              aria-label={title}
              className="
                card-hover rounded-xl p-6
                dark:bg-slate-800/50 bg-white
                border dark:border-slate-700/60 border-slate-200
                flex flex-col
              "
            >
              <span className="font-mono text-xs dark:text-slate-500 text-slate-400 mb-3">
                {project.context}
              </span>

              <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="text-base font-bold dark:text-slate-100 text-slate-900 leading-snug">
                  {title}
                </h3>
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("ariaGithubLink", { title })}
                    className="shrink-0 text-slate-400 hover:text-accent transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                )}
              </div>

              <p className="text-sm dark:text-slate-400 text-slate-600 leading-relaxed mb-4 flex-1">
                {t(`items.${project.id}.description`)}
              </p>

              <div className="flex flex-wrap gap-1.5" role="list" aria-label={t("ariaTagsLabel")}>
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="accent">
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}
