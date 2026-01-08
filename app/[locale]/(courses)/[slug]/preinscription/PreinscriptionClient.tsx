"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "@/app/[locale]/sections/Hero/heroSection.module.css";
import { InformationPanel } from "@/components/PreinscriptionPage/InformationPanel";
import { PreinscriptionForm } from "@/components/PreinscriptionPage/PreinscriptionForm";

type Props = {
  locale: string;
  slug: string;
  course: any; // ideal: tiparlo con un CoursePublic
};

export default function PreinscriptionClient({ locale, slug, course }: Props) {
  const t = useTranslations("preinscription");

  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 1);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!course) {
    return (
      <div
        className={`m-auto flex flex-col justify-center items-center max-w-7xl h-[calc(100vh-120px)] ${
          scrolled ? styles.headerspacerfixedbigscreen : ""
        }`}
      >
        <div className={`${scrolled ? styles.headerspacerfixed : ""} header-spacer`} />
        <h1 className="text-2xl mb-6">{t("notFound.title")}</h1>
        <Link
          className="shadow-md hover:scale-101 transition duration-150 ease-in text-md group py-2 px-3 bg-rose-400 text-white rounded-2xl flex items-center"
          href={`/${locale}`}
        >
          {t("notFound.homeBtn")}
          <ArrowRight size={16} className="ml-2 mr-1 group-hover:translate-x-1 transition" />
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`max-w-7xl flex flex-col justify-center items-center mx-auto min-h-[calc(100vh-120px)] ${
        scrolled ? styles.headerspacerfixedbigscreen : ""
      }`}
    >
      <div className={`${scrolled ? styles.headerspacerfixed : ""} header-spacer`} />

      {/* Breadcrumbs */}
      <div className="flex items-center text-sm text-gray-500 mb-3 space-x-2 self-start px-4">
        <Link href={`/${locale}`} className="hover:text-rose-400 transition-colors">
          {t("breadcrumbs.home")}
        </Link>
        <span>{">"}</span>
        <Link
          href={`/${locale}/${course.languageToLearn === "Spanish" ? "spanish" : "english"}`}
          className="hover:text-rose-400 transition-colors"
        >
          {t("breadcrumbs.courses")}
        </Link>
        <span>{">"}</span>
        <Link href={`/${locale}/${slug}`} className="hover:text-rose-400 transition-colors">
          {course.title}
        </Link>
        <span>{">"}</span>
        <span className="text-gray-700 font-medium">{t("breadcrumbs.preinscription")}</span>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 w-full">
        <InformationPanel course={course} />
        <PreinscriptionForm course={course} />
      </div>
    </div>
  );
}
