"use client"

import React, { useEffect, useState } from 'react'

import { useParams } from 'next/navigation';
import Link from 'next/link';

import { ArrowRight } from 'lucide-react';

import styles from "@/app/sections/Hero/heroSection.module.css";

import { mockCourses } from '@/lib/mockcourses/mockCourses';
import { InformationPanel } from '../../../../components/PreinscriptionPage/InformationPanel';
import { PreinscriptionForm } from '../../../../components/PreinscriptionPage/PreinscriptionForm';

export default function Preinscription() {
    const params = useParams();
    const slug = params.slug;

    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setScrolled(offset > 1);
        };
        window.addEventListener("scroll", handleScroll);
    }, []);

    const course = mockCourses.find((c) => c.slug === slug);

    if (!course) {
        return (
            <div
                className={`m-auto flex flex-col justify-center items-center max-w-7xl h-[calc(100vh-120px)] ${scrolled ? `${styles.headerspacerfixedbigscreen}` : ``
                    }`}
                style={{
                    minHeight: "calc( 100vh - 120px )",
                }}
            >
                <div
                    className={`divespaciador ${scrolled ? `${styles.headerspacerfixed}` : ``
                        } header-spacer`}
                ></div>
                <h1 className="text-2xl mb-6">Course not available</h1>
                <Link
                    className="shadow-md hover:scale-101 transition duration-150 ease-in text-md group py-2 px-3 bg-rose-400 text-white rounded-2xl flex items-center"
                    href="/"
                >
                    Home
                    <ArrowRight
                        size={16}
                        className="ml-2 mr-1 group-hover:translate-x-1 transition duration-150 ease-in-out"
                    />
                </Link>
            </div>
        );
    }

    return (
        <div
            className={`max-w-7xl mx-auto min-h-[calc(100vh-120px)]
                ${scrolled ? `${styles.headerspacerfixedbigscreen}` : ``}
                `}
        >
            <div className={`divespaciador ${scrolled ? `${styles.headerspacerfixed}` : ``} header-spacer`}></div>
            <div className="grid grid-cols-1 xl:grid-cols-3">
                <InformationPanel course={course} />
                <PreinscriptionForm course={course} />
            </div>
        </div>
    )
}
