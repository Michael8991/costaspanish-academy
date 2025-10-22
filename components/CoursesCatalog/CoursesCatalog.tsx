"use client";

import { mockCourses } from "@/lib/mockcourses/mockCourses";
import React, { JSX } from "react";
import { CourseFilters } from "@/types";
import {
  ArrowRight,
  CheckCircle,
  Circle,
  Clock,
  Hourglass,
  Tag,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

type CoursesCatalogProps = {
  filters: CourseFilters;
};

export const CoursesCatalog = ({ filters }: CoursesCatalogProps) => {
  const t = useTranslations("coursesCatalog");

  const params = useParams();
  const locale = params?.locale as string;

  const filteredCourses = mockCourses.filter((course) => {
    if (filters.language && course.languageToLearn !== filters.language) return false;
    if (filters.modality && course.modality !== filters.modality) return false;
    if (filters.level && course.level !== filters.level) return false;
    if (filters.status && course.status !== filters.status) return false;
    return true;
  });

  const statusStyles: Record<string, string> = {
    inProgress: "bg-green-100 shadow-lg shadow-green-500/25 text-green-800 rounded-full px-2 py-1",
    soon: "bg-yellow-100 shadow-lg shadow-yellow-500/25 text-yellow-800 rounded-lg px-2 py-1",
    pending: "bg-blue-100 shadow-lg shadow-blue-500/25 text-blue-800 rounded-tr-lg rounded-bl-lg px-2 py-1"
  };

  const statusIcons: Record<string, JSX.Element> = {
    inProgress: <Circle size={12} className="text-green-500 mr-1" />,
    soon: <Clock size={12} className="text-yellow-500 mr-1" />,
    pending: <CheckCircle size={12} className="text-blue-500 mr-1" />
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
      className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 px-5"
    >
      {filteredCourses.map((course) => (
        <motion.article
          key={course._id}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="border-none rounded-lg p-4 shadow-md bg-white hover:scale-102 transition duration-150 ease-in-out"
        >
          <header className="flex flex-col sm:flex-row justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-center sm:text-left">{course.title}</h2>
            {course.status && (
              <span
                className={`flex items-center text-xs font-semibold mt-1 sm:mt-0 ${statusStyles[course.status]}`}
              >
                {statusIcons[course.status]}
                {t(`status.${course.status}`)}
              </span>
            )}
          </header>

          <p className="font-light text-base my-4 text-center sm:text-left">
            {course.longDesc.length > 240 ? `${course.longDesc.substring(0, 240)}…` : course.longDesc}
          </p>

          <footer className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4">
            <div className="flex flex-wrap gap-3 sm:gap-4 w-full justify-center sm:justify-start">
              <span className="flex items-center w-fit text-xs bg-gray-100 py-2 px-3 rounded-4xl">
                <Tag size={16} className="mr-1" />
                {course.level ?? t("levels.default")}
              </span>
              <span className="flex items-center w-fit text-xs bg-gray-100 py-2 px-3 rounded-4xl">
                <Hourglass size={16} className="mr-1" />
                {course.modality}
              </span>
              <span className="flex items-center w-fit text-xs bg-gray-100 py-2 px-3 rounded-4xl">
                <UsersRound size={16} className="mr-1" />
                <p className="mr-1">{t("labels.max")}</p>
                {course.maxPeople}
                <p className="ml-1">{t("labels.persons")}</p>
              </span>
            </div>
            <div className="flex justify-center sm:justify-end items-center w-full sm:w-auto">
              <Link
                href={`/${locale}/${course.slug}`}
                className="group flex items-center gap-0.5 whitespace-nowrap text-sm font-medium bg-rose-400 text-white rounded-2xl py-2 px-3 transition"
              >
                {t("labels.moreInfo")}
                <ArrowRight
                  size={16}
                  className="transform transition-transform duration-200 ease-out group-hover:translate-x-1"
                />
              </Link>
            </div>
          </footer>
        </motion.article>
      ))}
    </motion.div>
  );
};
