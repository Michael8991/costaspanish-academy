"use client"

import React, { useState } from 'react'

import { CoursesCatalog } from '@/components/CoursesCatalog/CoursesCatalog';
import { FilterBarCourses } from '@/components/filterBarCourses/FilterBarCourses';
import { CourseFilters } from '@/types';

export default function spanishCourses() {

    const [filters, setFilters] = useState<CourseFilters>({ language: "Spanish" })

    return (
        <>
            <FilterBarCourses filters={filters} setFilters={setFilters} />
            <h1 className=''>Spanish courses</h1>
            <CoursesCatalog filters={filters} />
        </>
    )
}
