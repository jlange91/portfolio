"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
  className?: string;
  alternate?: boolean;
};

export default function Section({
  id,
  number,
  title,
  children,
  className,
  alternate = false,
}: SectionProps) {
  const shouldReduce = useReducedMotion();

  return (
    <section
      id={id}
      aria-label={title}
      className={cn(
        "py-20 md:py-28",
        alternate
          ? "dark:bg-slate-800/30 bg-slate-50"
          : "dark:bg-transparent bg-white",
        className
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12"
        >
          <span className="font-mono text-xs text-accent tracking-widest uppercase opacity-80 block mb-2">
            {number}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold dark:text-slate-100 text-slate-900 tracking-tight">
            {title}
          </h2>
          <div className="mt-3 h-px w-16 bg-gradient-to-r from-brand to-accent" aria-hidden="true" />
        </motion.div>

        {children}
      </div>
    </section>
  );
}
