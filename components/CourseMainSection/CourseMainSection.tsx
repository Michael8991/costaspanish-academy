"use client";

import { ICourseData } from "@/lib/mockcourses/CourseMock";
import {
  Calendar,
  CheckCircle,
  Circle,
  Clock,
  Tag,
  Target,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { JSX, useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

type CourseProps = {
  course: ICourseData;
};

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function JanuaryCountdown({
  endDate,
  label,
  endsInLabel,
  expiredLabel,
}: {
  endDate: Date;
  label: string;
  endsInLabel: string;
  expiredLabel: string;
}) {
  const [msLeft, setMsLeft] = useState<number>(() => endDate.getTime() - Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setMsLeft(endDate.getTime() - Date.now());
    }, 1000);

    return () => clearInterval(id);
  }, [endDate]);

  if (msLeft <= 0) {
    return (
      <p className="text-xs text-gray-500">
        {label} — {expiredLabel}
      </p>
    );
  }

  const totalSeconds = Math.floor(msLeft / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <div className="text-center">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-gray-800">
        {endsInLabel}: {days}d {pad(hours)}h {pad(minutes)}m {pad(seconds)}
      </p>
    </div>
  );
}

export default function CourseMainSection({ course }: CourseProps) {
  const t = useTranslations("coursePage");
  const locale = useLocale();

  const statusStyles: Record<string, string> = {
    inProgress:
      "bg-green-100 shadow-lg shadow-green-500/25 text-green-800 rounded-full px-2 py-1",
    private:
      "bg-green-100 shadow-lg shadow-green-500/25 text-green-800 rounded-full px-2 py-1",
    soon: "bg-yellow-100 shadow-lg shadow-yellow-500/25 text-yellow-800 rounded-lg px-2 py-1",
    pending:
      "bg-blue-100 shadow-lg shadow-blue-500/25 text-blue-800 rounded-tr-lg rounded-bl-lg px-2 py-1",
  };

  const statusIcons: Record<string, JSX.Element> = {
    inProgress: <Circle size={12} className="text-green-500 mr-1" />,
    private: <Circle size={12} className="text-green-500 mr-1" />,
    soon: <Clock size={12} className="text-yellow-500 mr-1" />,
    pending: <CheckCircle size={12} className="text-blue-500 mr-1" />,
  };

  const statusLabel: Record<string, string> = {
    inProgress: t("status.inProgress"),
    private: t("status.private"),
    soon: t("status.soon"),
    pending: t("status.pending"),
  };

  // --- PROMO ENERO (-50%) ---
  const now = new Date();
  const endOfJanuary = new Date(now.getFullYear(), 1, 1, 0, 0, 0); // Feb 1, 00:00 (fin de enero)

  // course.price = precio FINAL (con descuento) -> original = *2
  const original = Number(course.price);
  const discounted = original / 2;

  const formatEUR = (value: number) =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(value);

  const formattedDiscounted = formatEUR(discounted);
  const formattedOriginal = formatEUR(original);

  const isPrivate = course.status === "private";

  const discountedText = isPrivate
    ? t("details.price.private", { price: formattedDiscounted })
    : t("details.price.monthly", { price: formattedDiscounted });

  const originalText = isPrivate
    ? t("details.price.private", { price: formattedOriginal })
    : t("details.price.monthly", { price: formattedOriginal });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:mx-3 xl:mx-0">
      {/* Izquierda */}
      <div className="flex flex-col pt-5 px-4 md:px-0 items-center text-center">
        <h1 className="text-3xl md:text-4xl font-semibold text-center">
          {course.title}
        </h1>

        <div className="w-fit mx-auto my-3">
          {course.status && (
            <span
              className={`h-fit flex items-center text-xs font-semibold ${statusStyles[course.status]}`}
            >
              {statusIcons[course.status]}
              {statusLabel[course.status]}
            </span>
          )}
        </div>

        <span className="mt-1 text-md font-light mx-auto">
          {course.subTitle}
        </span>

        <p className="mt-3 text-center">{course.longDesc}</p>
      </div>

      {/* Derecha */}
      <div className="flex flex-col items-center bg-white rounded-2xl shadow-md p-5 sm:p-6 mx-4 sm:mx-6 lg:mx-0">
        <div className="relative w-full max-w-[450px] aspect-4/3 mx-auto">
          <Image
            fill
            src={course.imageUrl}
            alt={course.slug}
            className="object-cover rounded-xl"
            quality={80}
            placeholder="blur"
            blurDataURL="/blur.jpg"
          />
        </div>

        {/* ✅ Bloque precio (NO dentro de un span) */}
        <div className="mt-4 flex flex-col items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold text-rose-700">
            {t("details.promo.badge")}
          </span>

          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-500 line-through">
              {originalText}
            </span>

            <span className="text-2xl font-bold text-gray-900">
              {discountedText}
            </span>
          </div>

          <JanuaryCountdown
            endDate={endOfJanuary}
            label={t("details.promo.available")}
            endsInLabel={t("details.promo.endsIn")}
            expiredLabel={t("details.promo.expired")}
          />
        </div>

        <Link
          href={`/${locale}/${course.slug}/preinscription`}
          className="py-3 px-10 bg-rose-400 text-white font-normal text-lg shadow-md rounded-md my-3 hover:scale-105 transition-transform"
        >
          {t("preRegister")}
        </Link>

        <hr className="border-rose-100 rounded-2xl w-4/5 mx-auto my-4" />

        <div className="w-full px-2 sm:px-4">
          <h3 className="text-lg mb-4 font-semibold">{t("details.title")}</h3>

          <ul className="flex flex-col gap-1">
            {[
              {
                icon: <Clock size={18} className="text-rose-400" />,
                label: t("details.hoursPerWeek"),
                value: course.hoursPerWeek,
              },
              {
                icon: <Calendar size={18} className="text-rose-400" />,
                label: t("details.duration"),
                value: course.duration,
              },
              {
                icon: <UsersRound size={18} className="text-rose-400" />,
                label: t("details.limit"),
                value: `${course.maxPeople} ${t("details.students")}`,
              },
              {
                icon: <Target size={18} className="text-rose-400" />,
                label: t("details.level"),
                value: course.level,
              },
              {
                icon: <Tag size={18} className="text-rose-400" />,
                label: t("details.modality"),
                value: course.modality,
              },
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 p-2">
                <div className="bg-rose-100 p-2 rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="text-gray-700 font-medium">
                  {item.label}:{" "}
                  <span className="text-gray-900 font-semibold">
                    {item.value}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
