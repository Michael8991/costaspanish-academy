"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import styles from "@/app/[locale]/sections/Hero/heroSection.module.css";
import FaqAccordion from "@/components/Faq/FaqAccordion";
import { generalFaq } from "@/lib/mockcourses/mockFaq";
import CourseModule from "@/components/CourseModules/CourseModule";
import CourseMainSection from "@/components/CourseMainSection/CourseMainSection";
import { useTranslations } from "next-intl";

// CAMBIO 1: CourseClient ahora recibe props desde el Server page.tsx
type CourseClientProps = {
  locale: string;
  course: any; // recomendado: sustituir por ICourseData
};

export default function CourseClient({ locale, course }: CourseClientProps) {
  const t = useTranslations("coursesCatalog");
  const [scrolled, setScrolled] = useState(false);

  // CAMBIO 2: eliminamos useParams() y mockCourses (ya no se busca aquí)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 1);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // CAMBIO 3: params.locale -> locale (viene por props)
  if (!course) {
    return (
      <div
        className={`m-auto flex flex-col justify-center items-center max-w-7xl h-[calc(100vh-419px)] ${
          scrolled ? styles.headerspacerfixedbigscreen : ""
        }`}
      >
        <div
          className={`${scrolled ? styles.headerspacerfixed : ""} header-spacer`}
        />
        <h1 className="text-2xl mb-6">{t("notFoundTitle")}</h1>
        <Link
          href={`/${locale}`}
          className="shadow-md hover:scale-101 transition duration-150 ease-in text-md group py-2 px-3 bg-rose-400 text-white rounded-2xl flex items-center"
        >
          {t("goHome")}
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
      className={`max-w-7xl m-auto min-h-[calc(100vh-419px)] @container my-6 ${
        scrolled ? styles.headerspacerfixedbigscreen : ""
      }`}
    >
      <div
        className={`${scrolled ? styles.headerspacerfixed : ""} header-spacer`}
      />

      <div className="flex items-center text-sm text-gray-500 mb-3 space-x-2">
        <Link
          href={`/${locale}`}
          className="hover:text-rose-400 transition-colors"
        >
          {t("breadcrumbs.home")}
        </Link>
        <span className="select-none">{">"}</span>
        <Link
          href={`/${locale}/${course.languageToLearn === "Spanish" ? "spanish" : "english"}`}
          className="hover:text-rose-400 transition-colors"
        >
          {t("breadcrumbs.courses")}
        </Link>
        <span className="select-none">{">"}</span>
        <span className="text-gray-700 font-medium">{course.title}</span>
      </div>

      <CourseMainSection course={course} />
      <CourseModule course={course} />
      <FaqAccordion faqs={generalFaq} />
    </div>
  );
}
