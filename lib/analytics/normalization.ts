import type { CourseType, Locale } from "@/lib/analytics/events";

const COURSE_TYPE_BY_MODALITY: Readonly<Record<string, CourseType>> = {
  Private: "private",
  Standar: "standard",
  SemiIntensive: "semi_intensive",
  Intensive: "intensive",
};

export function normalizeCourseType(modality: unknown): CourseType {
  if (typeof modality !== "string") return "other";
  return COURSE_TYPE_BY_MODALITY[modality] ?? "other";
}

export function normalizeAnalyticsLocale(locale: unknown): Locale {
  return locale === "es" ? "es" : "en";
}
