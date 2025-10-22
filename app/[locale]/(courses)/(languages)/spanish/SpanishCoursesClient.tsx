"use client";

import React, { useState } from "react";
import { CoursesCatalog } from "@/components/CoursesCatalog/CoursesCatalog";
import { FilterBarCourses } from "@/components/filterBarCourses/FilterBarCourses";
import { CourseFilters } from "@/types";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SpanishCoursesClient() {
    const [filters, setFilters] = useState<CourseFilters>({ language: "Spanish" });
    const t = useTranslations("courses");
    const params = useParams();
    const locale = params?.locale ?? "en";

    return (
        <>
            <FilterBarCourses filters={filters} setFilters={setFilters} />
            <div className="flex items-center text-sm text-gray-500 mb-3 space-x-2 px-5">
                <Link href={`/${locale}`} className="hover:text-rose-400 transition-colors">
                    {t("breadcrumbs.home")}
                </Link>
                <span className="select-none">{">"}</span>
                <Link href={`/${locale}/spanish`} className="hover:text-rose-400 transition-colors">
                    {t("breadcrumbs.courses")}
                </Link>
            </div>
            <CoursesCatalog filters={filters} />
        </>
    );
}
