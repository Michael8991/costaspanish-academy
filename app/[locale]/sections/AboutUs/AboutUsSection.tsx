"use client";

import {
  ArrowRight,
  BriefcaseMedical,
  Clock,
  Flame,
  Globe,
  MessageSquare,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export const AboutUsSection = () => {
  const t = useTranslations("AboutUsSection");

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    const headerOffset = 120;
    if (!element) return;
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: elementPosition - headerOffset, behavior: "smooth" });
  };

  const icons = [
    Flame,
    Clock,
    UserRound,
    MessageSquare,
    BriefcaseMedical,
    Globe,
  ];
  const courses = t.raw("list") as { title: string; text: string }[];
  const paragraphs = t.raw("paragraphs") as string[];

  return (
    <section id="aboutUs" className="bg-white w-full flex justify-center py-10 shadow-md">
      <div className="max-w-7xl m-auto grid grid-cols-1 lg:grid-cols-2 mx-5 lg:mx-3 xl:mx-0 items-center gap-4">
        {/* Left side - images */}
        <div className="order-2 xl:order-1 my-5">
          <div className="relative w-full h-[500px]">
            <div className="absolute top-0 right-0 xl:right-20 w-full max-w-[200px] xl:max-w-[300px] aspect-[9/16] bg-rose-300 shadow-2xl rounded-md">
              <Image
                fill
                alt={t("images.teacherAlt")}
                src="/assets/MariaThinking.png"
                className="object-cover"
                quality={80}
                loading="lazy"
              />
            </div>
            <div className="absolute left-0 bottom-0 w-full max-w-[250px] xl:max-w-[300px] aspect-[4/3] bg-rose-300 shadow-2xl rounded-md">
              <Image
                fill
                alt={t("images.teacherAlt")}
                src="/assets/MariaThinking.png"
                className="object-cover"
                quality={80}
                loading="lazy"
              />
            </div>

            <motion.div
              animate={{ y: [10, 0, 10, 0, 10], x: [10, 0, 10, 0, 10] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col justify-center absolute top-40 xl:left-20 bg-rose-400 text-white shadow-rose-400/50 py-2 px-3 shadow-2xl rounded-sm text-center"
            >
              <span className="text-2xl font-bold">{t("experienceYears")}</span>
              <span className="text-md whitespace-pre-line">
                {t("experienceLabel")}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Right side - text */}
        <div className="order-1 md:order-2 space-y-6 my-5">
          <header>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
              {t.rich("title", {
                span1: (chunks) => <span className="text-rose-400">{chunks}</span>,
                span2: (chunks) => <span className="text-rose-400">{chunks}</span>,
                br: () => <br />
              })}
            </h2>
            <p className="mt-2 text-md lg:text-lg font-light text-gray-600 text-center">
              {t("subtitle")}
            </p>
          </header>

          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-gray-700 leading-relaxed text-center lg:text-left"
              dangerouslySetInnerHTML={{ __html: p }}
            />
          ))}

          <ul className="space-y-3 text-gray-700">
            {courses.map((item, i) => {
              const Icon = icons[i];
              return (
                <li key={i} className="flex items-center gap-2">
                  <Icon size={24} className="text-rose-600" />
                  <span>
                    <strong>{item.title}</strong> - {item.text}
                  </span>
                </li>
              );
            })}
          </ul>

          <div className="flex w-full justify-center">
            <button
              onClick={() => scrollToSection("courses")}
              className="group flex gap-2 items-center mt-4 px-6 py-3 rounded-md text-md lg:text-lg shadow-lg shadow-rose-400/50 hover:scale-101 bg-rose-400 text-white cursor-pointer"
            >
              {t("button")}
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition duration-150 ease-in-out" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
