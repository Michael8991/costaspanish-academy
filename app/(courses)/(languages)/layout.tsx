"use client"

import React, { useEffect, useState } from 'react'
import styles from "@/app/sections/Hero/heroSection.module.css";

export default function CoursesLayout({ children }: { children: React.ReactNode }) {

    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setScrolled(offset > 1);
        };
        window.addEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`@container max-w-7xl m-auto ${scrolled ? `${styles.headerspacerfixedbigscreen}` : ``}`} style={{ minHeight: "calc( 100vh - 120px )" }}>
            <div className={`${scrolled ? `${styles.headerspacerfixed}` : ``} header-spacer`}></div>
            {children}
        </div>
    )
}
