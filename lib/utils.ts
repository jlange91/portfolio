export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatDateRange(start: string, end: string): string {
  return `${start} — ${end}`;
}
