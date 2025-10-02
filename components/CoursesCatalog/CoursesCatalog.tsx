import { mockCourses } from '@/lib/mockcourses/mockCourses';
import React from 'react'
import { CourseFilters } from '@/types';

type CoursesCatalogProps = {
    filters: CourseFilters;
}

export const CoursesCatalog = ({ filters }: CoursesCatalogProps) => {
    const filteredCourses = mockCourses.filter(course => {
        // Filtrar por language (obligatorio)
        if (course.languageToLearn !== filters.language) return false;

        // Filtrar por modalidad si está definido
        if (filters.modality && course.modality !== filters.modality) return false;

        // Filtrar por nivel si está definido
        if (filters.level && course.level !== filters.level) return false;

        // Filtrar por status si está definido
        if (filters.status && course.status !== filters.status) return false;

        return true; // Si pasa todos los filtros
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCourses.map((course) => (
                <div key={course._id} className="border rounded-lg p-4 shadow-sm">
                    <h2 className="text-lg font-semibold">{course.title}</h2>
                    <p>{course.subTitle}</p>
                    <p className="text-sm text-gray-600">{course.price}</p>
                </div>
            ))}
        </div>
    )
}
