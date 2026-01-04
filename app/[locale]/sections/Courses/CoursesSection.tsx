import { CourseCard } from "@/components";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { ICourseData } from "@/types";
import dbConnect from "@/lib/mongo";
import { Course } from "@/models/Course";
import { getLocale, getTranslations } from "next-intl/server";

// CAMBIO 1: quitamos el prop { locale } porque a veces no se lo pasan y queda undefined
export const CoursesSection = async () => {
  // CAMBIO 2: obtenemos el locale real desde next-intl (server)
  const locale = await getLocale();

  // CAMBIO 3: getTranslations sigue igual, pero usando el locale obtenido aquí
  const t = await getTranslations({ locale, namespace: "home" });

  await dbConnect();
  const courses = await Course.find({ topCourses: true })
    .select("-__v")
    .lean<ICourseData[]>();

  const spanishCourses = courses.filter((c) => c.languageToLearn === "Spanish");
  const englishCourses = courses.filter((c) => c.languageToLearn === "English");

  return (
    <section id="courses" style={{ background: "#ffe5ec" }} className="my-10">
      <div className="@container py-5 max-w-7xl mx-auto">
        <h2 className="text-5xl w-full text-center lg:text-start font-extrabold mb-4">
          {t("CoursesSection.title")}
        </h2>

        {/* --- Spanish Courses --- */}
        <h3 className="text-lg font-light text-center lg:text-start mb-2">
          {t("CoursesSection.spanish.subtitle")}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 mb-5 justify-center mx-3">
          {spanishCourses.map((course) => (
            <div key={course.slug} className="flex justify-center">
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
                moreInfo={`/${locale}/${course.slug}`}
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
            {t("CoursesSection.spanish.cta")}
          </Link>
        </div>

        {/* --- English Courses --- */}
        {/* ... */}
      </div>
    </section>
  );
};
