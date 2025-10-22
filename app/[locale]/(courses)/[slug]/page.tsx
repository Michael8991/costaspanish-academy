"use client";

import { mockCourses } from "@/lib/mockcourses/mockCourses";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import styles from "@/app/[locale]/sections/Hero/heroSection.module.css";
import FaqAccordion from "@/components/Faq/FaqAccordion";
import { generalFaq } from "@/lib/mockcourses/mockFaq";
import CourseModule from "../../../../components/CourseModules/CourseModule";
import CourseMainSection from "@/components/CourseMainSection/CourseMainSection";

export default function Course() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 1);
    };
    window.addEventListener("scroll", handleScroll);
  }, []);

  const params = useParams();
  const slug = params.slug;

  const course = mockCourses.find((c) => c.slug === slug);

  if (!course) {
    return (
      <div
        className={`m-auto flex flex-col justify-center items-center max-w-7xl h-[calc(100vh-419px)] ${scrolled ? `${styles.headerspacerfixedbigscreen}` : ``
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
      className={`max-w-7xl m-auto min-h-[calc(100vh-419px)] @container my-6 ${scrolled ? `${styles.headerspacerfixedbigscreen}` : ``
        }`}
      style={{
        minHeight: "calc( 100vh - 120px )",
      }}
    >
      <div
        className={`divespaciador ${scrolled ? `${styles.headerspacerfixed}` : ``
          } header-spacer`}
      ></div>

      <div className="flex items-center text-sm text-gray-500 mb-3 space-x-2">
        <Link href="/" className="hover:text-rose-400 transition-colors">
          Home
        </Link>
        <span className="select-none">{">"}</span>
        <Link
          href={course.languageToLearn === "Spanish" ? "/spanish" : "/english"}
          className="hover:text-rose-400 transition-colors"
        >
          Courses
        </Link>
        <span className="select-none">{">"}</span>
        <span className="text-gray-700 font-medium">{course.title}</span>
      </div>

      {/* Sección principal */}
      <CourseMainSection course={course} />

      {/* Secciones inferiores */}
      <div>
        <CourseModule course={course} />
      </div>
      <div>
        <FaqAccordion faqs={generalFaq} />
      </div>
    </div>
  );
}
