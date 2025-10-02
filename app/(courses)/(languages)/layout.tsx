import React from 'react'

export default function CoursesLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="max-w-6xl mx-auto py-10 min-h-screen">

            {children}
        </div>
    )
}
