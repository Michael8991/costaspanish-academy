"use client";

import { ICourseData } from "@/lib/mockcourses/CourseMock";
import { CheckCircle, Circle, Clock, Info } from "lucide-react";
import { useTranslations } from "next-intl";

type Props = {
    course: ICourseData;
};

export const InformationPanel = ({ course }: Props) => {
    const t = useTranslations("preinscription.info");

    const statusStyles: Record<string, string> = {
        inProgress:
            "bg-green-100 shadow-lg shadow-green-500/25 text-green-800 rounded-full px-2 py-1",
        soon: "bg-yellow-100 shadow-lg shadow-yellow-500/25 text-yellow-800 rounded-lg px-2 py-1",
        pending:
            "bg-blue-100 shadow-lg shadow-blue-500/25 text-blue-800 rounded-tr-lg rounded-bl-lg px-2 py-1",
    };

    const statusIcons = {
        inProgress: <Circle size={12} className="text-green-500 mr-1" />,
        private: <Circle size={12} className="text-green-500 mr-1" />,
        soon: <Clock size={12} className="text-yellow-500 mr-1" />,
        pending: <CheckCircle size={12} className="text-blue-500 mr-1" />
    };

    const statusLabel = {
        inProgress: t("status.inProgress"),
        soon: t("status.soon"),
        pending: t("status.pending"),
        private: t("status.private")
    };

    const paragraphs = t.raw(course.status ?? "pending") as Record<string, string>;

    return (
        <div className="bg-white rounded-md shadow-md p-4 flex flex-col m-3 xl:m-1">
            <h1 className="text-xl font-semibold capitalize w-full text-center mb-2">{course.title}</h1>
            <div className="w-full flex justify-center mb-2">
                {course.status && (
                    <span
                        className={`h-fit flex items-center text-xs font-semibold ${statusStyles[course.status]}`}
                    >
                        {statusIcons[course.status]}
                        {statusLabel[course.status]}
                    </span>
                )}
            </div>

            <div className="my-4 text-md text-justify">
                {Object.values(paragraphs).map((p, i) => (
                    <p key={i} className="mb-3">{p}</p>
                ))}
            </div>

            <div className="mt-auto mb-5 text-center text-sm font-light">
                <p>{t("contact.title")}</p>
                <p>{t("contact.whatsapp")}</p>
                <p>{t("contact.email")}</p>
                <p className="mt-3">{t("contact.privacy")}</p>
            </div>
        </div>
    );
};
