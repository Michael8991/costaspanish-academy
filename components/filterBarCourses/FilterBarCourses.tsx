"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CourseFilters } from "@/types";
import { Dropdown } from "../UI/Dropdown";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";

type FilterBarCoursesProps = {
  filters: CourseFilters;
  setFilters: Dispatch<SetStateAction<CourseFilters>>;
};

export const FilterBarCourses = ({ filters, setFilters }: FilterBarCoursesProps) => {
  const t = useTranslations("filters");
  const languageOptions = t.raw("languageOptions") as string[];
  const statusOptions = Object.keys(t.raw("statusOptions")) as string[];
  const modalityOptions = Object.keys(t.raw("modalityOptions")) as string[];
  const levelOptions = t.raw("levelOptions") as string[];

  const statusLabel = t.raw("statusOptions") as Record<string, string>;
  const modalityLabel = t.raw("modalityOptions") as Record<string, string>;

  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedModality, setSelectedModality] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleApplyFilters = () => {
    setFilters({
      status: selectedStatus as "inProgress" | "soon" | "pending" | undefined,
      modality: selectedModality as
        | "Intensive"
        | "SemiIntensive"
        | "Standar"
        | "Private"
        | undefined,
      level: selectedLevel as
        | "A1"
        | "A2"
        | "B1"
        | "B2"
        | "C1"
        | "C2"
        | undefined,
      language: selectedLanguage as "Spanish" | "English" | undefined,
    });
    setShowMobileFilters(false);
  };

  const handleResetFilters = () => {
    setSelectedStatus(null);
    setSelectedModality(null);
    setSelectedLevel(null);
    setSelectedLanguage(null);
    setFilters({ status: undefined, modality: undefined, level: undefined, language: undefined });
    setShowMobileFilters(false);
  };

  return (
    <>
      {/* Botón móvil */}
      <div className="flex justify-center md:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters(prev => !prev)}
          className="flex items-center gap-2 px-4 py-2 bg-rose-400 text-white rounded-xl shadow-md hover:bg-rose-500 transition"
        >
          <SlidersHorizontal size={20} />
          {t("labels.apply")}
        </button>
      </div>

      {/* Barra de filtros */}
      <AnimatePresence>
        {(!isMobile || showMobileFilters) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row items-center justify-center mb-10 gap-4 md:gap-6 bg-white w-full sm:w-fit m-auto py-4 px-4 sm:px-6 md:px-10 rounded-2xl shadow-md"
          >
            <Dropdown
              id="language"
              options={languageOptions}
              selected={selectedLanguage}
              onChange={setSelectedLanguage}
              placeholder={t("labels.language")}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            />
            <Dropdown
              id="status"
              options={statusOptions}
              selected={selectedStatus}
              onChange={setSelectedStatus}
              placeholder={t("labels.status")}
              renderOption={(option) => statusLabel[option]}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            />
            <Dropdown
              id="modality"
              options={modalityOptions}
              selected={selectedModality}
              onChange={setSelectedModality}
              placeholder={t("labels.modality")}
              renderOption={(option) => modalityLabel[option]}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            />
            <Dropdown
              id="level"
              options={levelOptions}
              selected={selectedLevel}
              onChange={setSelectedLevel}
              placeholder={t("labels.level")}
              openDropdown={openDropdown}
              setOpenDropdown={setOpenDropdown}
            />

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2 md:mt-0 w-full md:w-auto">
              <button
                onClick={handleApplyFilters}
                className="px-4 py-2 bg-rose-400 text-white rounded-lg hover:bg-rose-500 transition w-full sm:w-auto"
              >
                {t("labels.apply")}
              </button>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition w-full sm:w-auto"
              >
                {t("labels.reset")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
