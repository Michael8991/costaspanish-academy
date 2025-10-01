import { mockCourses } from '@/lib/mockcourses/mockCourses'
import React from 'react'

export default function spanishCourses() {
    const spanishCourses = mockCourses.filter(course => course.languageToLearn === 'Spanish')
    return (
        <div className="max-w-md mx-auto py-10">
            <h2 className="text-2xl font-bold mb-4">Listado de cursos</h2>
            <ul className="list-disc pl-5 space-y-1">
                {spanishCourses.map(course => (
                    <li key={course._id}>{course.title}</li>
                ))}
            </ul>
        </div>
    )
}
