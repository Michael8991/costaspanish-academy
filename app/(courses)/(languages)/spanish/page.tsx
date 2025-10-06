"use client";

import React, { useState } from "react";

import { CoursesCatalog } from "@/components/CoursesCatalog/CoursesCatalog";
import { FilterBarCourses } from "@/components/filterBarCourses/FilterBarCourses";
import { CourseFilters } from "@/types";

export default function SpanishCourses() {
  const [filters, setFilters] = useState<CourseFilters>({
    language: "Spanish",
  });

  return (
    <>
      <FilterBarCourses filters={filters} setFilters={setFilters} />
      <CoursesCatalog filters={filters} />
    </>
  );
}
