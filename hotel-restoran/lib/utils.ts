export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function stars(count: number) {
  return "★".repeat(count) + "☆".repeat(5 - count);
}

export function normalize(text: string) {
  return text.trim().toLowerCase();
}
