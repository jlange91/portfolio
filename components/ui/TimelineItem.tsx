"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type TimelineItemProps = {
  index: number;
  children: React.ReactNode;
  isLast?: boolean;
};

export default function TimelineItem({ index, children, isLast = false }: TimelineItemProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, x: shouldReduce ? 0 : -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: "easeOut" }}
      className="relative pl-8 md:pl-10"
    >
      {/* Vertical connector line */}
      {!isLast && (
        <div
          className="absolute left-[11px] md:left-[13px] top-6 bottom-0 w-px bg-gradient-to-b from-brand/60 via-brand/30 to-transparent"
          aria-hidden="true"
        />
      )}

      {/* Timeline dot */}
      <div
        className={cn(
          "absolute left-0 top-[6px] w-6 h-6 rounded-full border-2 flex items-center justify-center",
          "border-brand bg-white dark:bg-slate-900",
          "shadow-[0_0_12px_rgba(56,189,248,0.2)]"
        )}
        aria-hidden="true"
      >
        <div className="w-2 h-2 rounded-full bg-accent" />
      </div>

      <div className="pb-12">{children}</div>
    </motion.div>
  );
}
