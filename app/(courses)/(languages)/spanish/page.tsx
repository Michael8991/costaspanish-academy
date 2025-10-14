"use client";

import React, { useState } from "react";

import { CoursesCatalog } from "@/components/CoursesCatalog/CoursesCatalog";
import { FilterBarCourses } from "@/components/filterBarCourses/FilterBarCourses";
import { CourseFilters } from "@/types";
import Link from "next/link";

export default function SpanishCourses() {
  const [filters, setFilters] = useState<CourseFilters>({
    language: "Spanish",
  });

  return (
    <>
      <FilterBarCourses filters={filters} setFilters={setFilters} />
      <div className="flex items-center text-sm text-gray-500 mb-3 space-x-2 px-5">
        <Link href="/" className="hover:text-rose-400 transition-colors">
          Home
        </Link>
        <span className="select-none">{">"}</span>
        <Link href="#" className="hover:text-rose-400 transition-colors">
          Courses
        </Link>
      </div>
      <CoursesCatalog filters={filters} />
    </>
  );
}
