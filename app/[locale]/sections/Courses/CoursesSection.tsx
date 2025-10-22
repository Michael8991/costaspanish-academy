'use client';

import { CourseCard } from "@/components";
import { mockCourses } from '@/lib/mockcourses/mockCourses';
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export const CoursesSection = () => {
  const t = useTranslations("CoursesSection");

  const params = useParams();
  const locale = params?.locale as string;

  const spanishCourses = mockCourses.filter(
    (course) => course.topCourses && course.languageToLearn === "Spanish"
  );
  const englishCourses = mockCourses.filter(
    (course) => course.topCourses && course.languageToLearn === "English"
  );

  return (
    <section id="courses" style={{ background: "#ffe5ec" }} className="my-10">
      <div className="@container py-5 max-w-7xl mx-auto">
        <h2 className="text-5xl w-full text-center lg:text-start font-extrabold mb-4">
          {t("title")}
        </h2>

        {/* --- Spanish Courses --- */}
        <h3 className="text-lg font-light text-center lg:text-start mb-2">
          {t("spanish.subtitle")}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mb-5 justify-center mx-3">
          {spanishCourses.map((course) => (
            <div key={course._id} className="flex justify-center">
              <CourseCard
                slug={course.slug}
                titleCard={course.title}
                subTitle={course.subTitle}
                maxPers={`${course.maxPeople} max.`}
                time={course.hoursPerWeek}
                level={course.level}
                modality={course.modality}
                img={course.imageUrl}
                status={course.status}
                moreInfo={`/${course.slug}`}
              />
            </div>
          ))}
        </div>

        <div className="max-w-7xl flex align-middle justify-center mb-5">
          <Link
            href={`/${locale}/spanish`}
            className="flex rounded-lg hover:bg-rose-400 py-2 px-3 hover:scale-105 transition-all duration-100 hover:shadow-xl focus:outline-none hover:text-white"
          >
            <ChevronDown size={24} className="mr-1" />
            {t("spanish.cta")}
          </Link>
        </div>

        {/* --- English Courses --- */}
        <h3 className="text-lg font-light text-center lg:text-start mb-2">
          {t("english.subtitle")}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mb-5 justify-center mx-3">
          {englishCourses.map((course) => (
            <div key={course._id} className="flex justify-center">
              <CourseCard
                slug={course.slug}
                titleCard={course.title}
                subTitle={course.subTitle}
                maxPers={`${course.maxPeople} max.`}
                time={course.hoursPerWeek}
                level={course.level}
                modality={course.modality}
                img={course.imageUrl}
                status={course.status}
                moreInfo={`/${course.slug}`}
              />
            </div>
          ))}
        </div>

        <div className="max-w-7xl flex align-middle justify-center mb-2">
          <Link
            href={`/${locale}/english`}
            className="flex rounded-lg hover:bg-rose-400 py-2 px-3 hover:scale-105 transition-all duration-100 hover:shadow-xl focus:outline-none hover:text-white"
          >
            <ChevronDown size={24} className="mr-1" />
            {t("english.cta")}
          </Link>
        </div>
      </div>
    </section>
  );
};
