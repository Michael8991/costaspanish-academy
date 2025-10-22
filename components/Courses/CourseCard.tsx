'use client';

import { ArrowRight, CheckCircle, Circle, Clock, Hourglass, Tag, UsersRound } from "lucide-react";
import styles from "./courseCard.module.css";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { JSX } from "react";
import { useParams } from "next/navigation";

interface CourseCardProps {
  titleCard: string;
  maxPers: string;
  time: string;
  level?: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  modality?: "Intensive" | "SemiIntensive" | "Standar" | "Private";
  subTitle: string;
  moreInfo: string;
  img: string;
  status?: "inProgress" | "private" | "soon" | "pending";
  slug: string;
}

export const CourseCard = ({
  titleCard,
  maxPers,
  time,
  moreInfo,
  img,
  subTitle,
  level,
  modality,
  slug,
  status,
}: CourseCardProps) => {
  const t = useTranslations("CourseCard");

  const params = useParams();
  const locale = params?.locale as string;

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
    <div className={`${styles.courseCard} my-2 bg-white flex flex-col items-center`}>
      <div className="relative">
        <div className="relative w-full max-w-[350px] h-[250px] aspect-[4/3] mx-auto">
          <Image
            fill
            src={img}
            alt={t("alt", { title: titleCard })}
            className="object-cover rounded-xl"
            quality={80}
            placeholder="blur"
            blurDataURL="/blur.jpg"
            loading="lazy"
          />
        </div>
        <div className="absolute top-0 right-0">
          {status && (
            <span className={`flex items-center text-xs font-semibold w-fit ${statusStyles[status]}`}>
              {statusIcons[status]}
              {t(`status.${status}`)}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h3 className="text-md font-semibold text-center">{titleCard}</h3>

        <div className="flex gap-2 w-full my-1 justify-center flex-wrap">
          <span className="flex items-center w-fit text-xs bg-gray-100 py-2 px-3 rounded-2xl">
            <Tag size={14} className="mr-1" />
            {level || t("level.default")}
          </span>
          {modality && (
            <span className="flex items-center w-fit text-xs bg-gray-100 py-2 px-3 rounded-2xl">
              <Hourglass size={14} className="mr-1" />
              {t(`modality.${modality}`)}
            </span>
          )}
          <span className="flex items-center w-fit text-xs bg-gray-100 py-2 px-3 rounded-2xl">
            <UsersRound size={14} className="mr-1" />
            {maxPers} <span className="ml-1">{t("persons")}</span>
          </span>
        </div>

        <p className="font-light text-base my-2 text-center">{subTitle}</p>
      </div>

      <div className="flex w-full justify-center">
        <Link
          href={`/${locale}/${slug}`}
          className="hover:scale-103 duration-150 ease-in group flex items-center gap-0.5 whitespace-nowrap text-sm font-medium bg-rose-400 text-white rounded-2xl py-2 px-3 transition"
        >
          {t("moreInfo")}
          <ArrowRight
            size={16}
            className="transform transition-transform duration-200 ease-in group-hover:translate-x-1"
          />
        </Link>
      </div>
    </div>
  );
};
