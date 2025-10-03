
import { mockCourses } from '@/lib/mockcourses/mockCourses';
import React, { JSX } from 'react'
import { CourseFilters } from '@/types';
import { CheckCircle, Circle, Clock } from 'lucide-react';



type CoursesCatalogProps = {
    filters: CourseFilters;
}


export const CoursesCatalog = ({ filters }: CoursesCatalogProps) => {
    const filteredCourses = mockCourses.filter(course => {
        // Filtrar por modalidad si está definido
        if (filters.language && course.languageToLearn !== filters.language) return false;

        // Filtrar por modalidad si está definido
        if (filters.modality && course.modality !== filters.modality) return false;

        // Filtrar por nivel si está definido
        if (filters.level && course.level !== filters.level) return false;

        // Filtrar por status si está definido
        if (filters.status && course.status !== filters.status) return false;

        return true; // Si pasa todos los filtros
    });

    // Mapea los estados a estilos y/o íconos
    const statusStyles: Record<string, string> = {
        inProgress: "bg-green-100 shadow-lg shadow-green-500/25 text-green-800 rounded-full px-2 py-1",
        soon: "bg-yellow-100 shadow-lg shadow-yellow-500/25 text-yellow-800 rounded-lg px-2 py-1",
        pending: "bg-blue-100 shadow-lg shadow-blue-500/25 text-blue-800 rounded-tr-lg rounded-bl-lg px-2 py-1",
    };

    const statusIcons: Record<string, JSX.Element> = {
        inProgress: <Circle size={12} className="text-green-500 mr-1" />,
        soon: <Clock size={12} className="text-yellow-500 mr-1" />,
        pending: <CheckCircle size={12} className="text-blue-500 mr-1" />,
    };

    const statusLabel: Record<string, string> = {
        inProgress: "In progress",
        soon: "Coming soon",
        pending: "Open registrations",
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {
                filteredCourses.map((course) => (
                    <div key={course._id} className="border-none rounded-lg p-4 shadow-md bg-white">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-lg font-semibold">{course.title}</h2>
                            {course.status && (
                                <span className={`flex items-center text-xs font-semibold ${statusStyles[course.status]}`}>
                                    {statusIcons[course.status]}
                                    {statusLabel[course.status]}
                                </span>
                            )}
                        </div>
                        <p>{course.subTitle}</p>
                        <p className="text-sm text-gray-600">{course.price}</p>
                    </div>
                ))
            }
        </div >

    )
}
