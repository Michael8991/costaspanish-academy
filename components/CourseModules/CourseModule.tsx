"use client";

import { ICourseData } from "@/lib/mockcourses/CourseMock";
import { Book, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

type CourseModulesProps = {
    course: ICourseData;
};

export default function CourseModule({ course }: CourseModulesProps) {
    const t = useTranslations("coursePage");
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    const toggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-7xl lg:mx-3 xl:mx-0 mx-4 sm:mx-6 my-14 shadow-md rounded-md p-6 sm:p-10 bg-white">
            {/* --- Header --- */}
            <div className="w-full flex flex-col justify-start bg-white p-5 rounded-t-md">
                <span className="py-1 px-2 rounded-md shadow-md w-fit flex items-center bg-rose-400 text-white text-xs mb-4">
                    {t("modules.badge")}
                </span>
                <h3 className="text-xl font-semibold mb-2">{t("modules.title")}</h3>
                <p className="text-md text-gray-700">{t("modules.description")}</p>

                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-4 flex items-center gap-2 text-rose-500 hover:text-rose-600 transition-colors text-sm font-medium cursor-pointer"
                >
                    {isExpanded ? (
                        <>
                            <ChevronUp size={16} /> {t("modules.hide")}
                        </>
                    ) : (
                        <>
                            <ChevronDown size={16} /> {t("modules.show")}
                        </>
                    )}
                </button>
            </div>

            {/* --- Collapsible Modules Section --- */}
            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="bg-white"
                    >
                        {course.modules.map((module, i) => {
                            const isOpen = openIndex === i;
                            return (
                                <motion.div
                                    key={i}
                                    layout
                                    className="overflow-hidden mb-2"
                                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                >
                                    <motion.button
                                        layout
                                        onClick={() => toggle(i)}
                                        className="flex items-center justify-between w-full p-2 font-semibold text-md cursor-pointer"
                                    >
                                        <div className="flex items-center gap-2">
                                            <motion.div
                                                animate={{ color: isOpen ? "#ff637e" : "#000" }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                {isOpen ? <BookOpen size={18} /> : <Book size={18} />}
                                            </motion.div>
                                            <span>{module.title}</span>
                                        </div>
                                        <motion.div
                                            animate={{ rotate: isOpen ? 180 : 0 }}
                                            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                        >
                                            <ChevronDown />
                                        </motion.div>
                                    </motion.button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                                className="overflow-hidden px-4 sm:px-6 py-3 bg-white"
                                            >
                                                <ul className="flex flex-col gap-2">
                                                    {module.submodules?.map((sub, idx) => (
                                                        <li key={idx} className="flex items-center gap-2">
                                                            <Book size={16} className="text-rose-400" />
                                                            <span className="text-gray-700 font-medium">{sub.title}</span>
                                                            {sub.duration && (
                                                                <span className="text-gray-500 ml-auto">{sub.duration}</span>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
