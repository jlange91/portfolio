import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "accent" | "outline";

type BadgeProps = {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

const variantClasses: Record<BadgeVariant, string> = {
  default:
    "bg-slate-100 text-slate-700 border border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
  accent:
    "bg-brand/10 text-brand border border-brand/30 dark:text-accent dark:border-brand/30",
  outline:
    "bg-transparent text-slate-500 border border-slate-300 dark:text-slate-400 dark:border-slate-600",
};

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block px-2.5 py-0.5 rounded text-xs font-mono leading-5 transition-colors",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
