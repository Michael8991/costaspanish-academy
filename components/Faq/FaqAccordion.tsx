"use client";

import React, { useState } from "react";
import { IFaqData } from "@/lib/mockcourses/CourseMock";
import { ChevronDown, ChevronUp, CircleQuestionMark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

type FaqAccordionProps = {
    faqs: IFaqData[];
};

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
    const t = useTranslations("coursePage");
    const { locale } = useParams();
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
                    {t("faq.badge")}
                </span>
                <h3 className="text-xl font-semibold mb-2">{t("faq.title")}</h3>
                <p className="text-md text-gray-700">{t("faq.description")}</p>

                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-4 flex items-center gap-2 text-rose-500 hover:text-rose-600 transition-colors text-sm font-medium cursor-pointer"
                >
                    {isExpanded ? (
                        <>
                            <ChevronUp size={16} /> {t("faq.hide")}
                        </>
                    ) : (
                        <>
                            <ChevronDown size={16} /> {t("faq.show")}
                        </>
                    )}
                </button>
            </div>

            {/* --- Collapsible FAQ Section --- */}
            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="bg-white rounded-b-md grid grid-cols-1 md:grid-cols-2"
                    >
                        {faqs.map((faq, index) => {
                            const isOpen = openIndex === index;

                            return (
                                <motion.div key={index} layout className="overflow-hidden">
                                    <motion.button
                                        layout
                                        onClick={() => toggle(index)}
                                        className="flex items-center justify-between w-full p-5 font-semibold text-md cursor-pointer"
                                    >
                                        <div className="flex items-center gap-2">
                                            <motion.div
                                                animate={{ color: isOpen ? "#ff637e" : "#000" }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <CircleQuestionMark size={18} />
                                            </motion.div>
                                            {faq.question}
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
                                                initial={{ opacity: 0, marginTop: 0, marginBottom: 0 }}
                                                animate={{
                                                    opacity: 1,
                                                    marginTop: 10,
                                                    marginBottom: 10,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    marginTop: 0,
                                                    marginBottom: 0,
                                                }}
                                                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                                className="px-5 text-gray-700 text-md"
                                            >
                                                <p>{faq.answer}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}

                        {/* --- Contact CTA --- */}
                        <div className="col-span-1 md:col-span-2 flex flex-col items-center mt-4 px-5">
                            <p className="text-center">{t("faq.contactText")}</p>
                            <Link
                                className="py-2 px-3 rounded-md bg-rose-400 text-white shadow-md mt-2 hover:scale-101 hover:cursor-pointer"
                                href={`/${locale}/contactUs`}
                            >
                                {t("faq.contactBtn")}
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
