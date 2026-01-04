"use client";

import React, { useMemo, useState } from "react";
import { CoursesCatalog } from "@/components/CoursesCatalog/CoursesCatalog";
import { FilterBarCourses } from "@/components/filterBarCourses/FilterBarCourses";
import { CourseFilters, ICourseData } from "@/types";
import { useTranslations } from "next-intl";
import Link from "next/link";

type SpanishCoursesClientProps = {
  locale: string;
  courses: ICourseData[];
};

export default function SpanishCoursesClient({
  locale,
  courses,
}: SpanishCoursesClientProps) {
  const [filters, setFilters] = useState<CourseFilters>({
    language: "Spanish",
  });
  const t = useTranslations("courses");

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      if (filters.language && c.languageToLearn !== filters.language)
        return false;
      if (filters.level && c.level !== filters.level) return false;
      if (filters.modality && c.modality !== filters.modality) return false;

      return true;
    });
  }, [courses, filters]);

  return (
    <>
      <FilterBarCourses
        filters={filters}
        setFilters={setFilters}
        hideLanguage
      />

      <div className="flex items-center text-sm text-gray-500 mb-3 space-x-2 px-5">
        <Link
          href={`/${locale}`}
          className="hover:text-rose-400 transition-colors"
        >
          {t("breadcrumbs.home")}
        </Link>
        <span className="select-none">{">"}</span>
        <Link
          href={`/${locale}/spanish`}
          className="hover:text-rose-400 transition-colors"
        >
          {t("breadcrumbs.courses")}
        </Link>
      </div>

      <CoursesCatalog
        filters={filters}
        courses={filteredCourses}
        locale={locale}
      />
    </>
  );
}
