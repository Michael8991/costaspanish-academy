"use client";

import React, { useState } from "react";

import { CoursesCatalog } from "@/components/CoursesCatalog/CoursesCatalog";
import { FilterBarCourses } from "@/components/filterBarCourses/FilterBarCourses";
import { CourseFilters } from "@/types";

export default function EnglishCourses() {
  const [filters, setFilters] = useState<CourseFilters>({
    language: "English",
  });

  return (
    <>
      <FilterBarCourses filters={filters} setFilters={setFilters} />
      <CoursesCatalog filters={filters} />
    </>
  );
}
