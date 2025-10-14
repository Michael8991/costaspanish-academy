import React, { Dispatch, SetStateAction, useState } from "react";
import { CourseFilters } from "@/types";
import { Dropdown } from "../UI/Dropdown";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";

const languageOptions = ["Spanish", "English"];
const statusOptions = ["inProgress", "soon", "pending"];
const modalityOptions = ["Intensive", "SemiIntensive", "Standar", "Private"];
const levelOptions = ["A1", "A2", "B1", "B2", "C1", "C2"];

const statusLabel: Record<string, string> = {
  inProgress: "In progress",
  soon: "Coming soon",
  pending: "Open registrations",
};
const modalityLabel: Record<string, string> = {
  Intensive: "Intensive course",
  SemiIntensive: "Semi-Intensive course",
  Standar: "Standar course",
  Private: "Private lesson",
};

type FilterBarCoursesProps = {
  filters: CourseFilters;
  setFilters: Dispatch<SetStateAction<CourseFilters>>;
};

export const FilterBarCourses = ({
  filters,
  setFilters,
}: FilterBarCoursesProps) => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedModality, setSelectedModality] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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
    setFilters({
      status: undefined,
      modality: undefined,
      level: undefined,
      language: undefined,
    });
    setShowMobileFilters(false);
  };

  return (
    <>
      {/* Botón móvil */}
      <div className="flex justify-center md:hidden mb-4">
        <button
          onClick={() => setShowMobileFilters((prev) => !prev)}
          className="flex items-center gap-2 px-4 py-2 bg-rose-400 text-white rounded-xl shadow-md hover:bg-rose-500 transition"
        >
          <SlidersHorizontal size={20} />
          Filters
        </button>
      </div>

      {/* Barra de filtros */}
      <AnimatePresence>
        {(showMobileFilters || window.innerWidth >= 768) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col md:flex-row items-center justify-center mb-10 gap-4 md:gap-6 bg-white w-full sm:w-fit m-auto py-4 px-4 sm:px-6 md:px-10 rounded-2xl shadow-md"
          >
            {/* Envuelvo los dropdowns para poder usar width responsive */}
            <div className="w-full sm:w-auto">
              <Dropdown
                id="language"
                options={languageOptions}
                selected={selectedLanguage}
                onChange={setSelectedLanguage}
                placeholder="Language"
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
              />
            </div>
            <div className="w-full sm:w-auto">
              <Dropdown
                id="status"
                options={statusOptions}
                selected={selectedStatus}
                onChange={setSelectedStatus}
                placeholder="Status"
                renderOption={(option) => statusLabel[option]}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
              />
            </div>
            <div className="w-full sm:w-auto">
              <Dropdown
                id="modality"
                options={modalityOptions}
                selected={selectedModality}
                onChange={setSelectedModality}
                placeholder="Modality"
                renderOption={(option) => modalityLabel[option]}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
              />
            </div>
            <div className="w-full sm:w-auto">
              <Dropdown
                id="level"
                options={levelOptions}
                selected={selectedLevel}
                onChange={setSelectedLevel}
                placeholder="Level"
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
              />
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 mt-2 md:mt-0 w-full md:w-auto">
              <button
                onClick={handleApplyFilters}
                className="px-4 py-2 bg-rose-400 text-white rounded-lg hover:bg-rose-500 transition w-full sm:w-auto"
              >
                Apply Filters
              </button>
              <button
                onClick={handleResetFilters}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition w-full sm:w-auto"
              >
                Reset Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
