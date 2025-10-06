import React, { Dispatch, SetStateAction } from "react";
import styles from "./filterBarCourses.module.css";
import { CourseFilters } from "@/types";
import { Dropdown } from "../UI/Dropdown";
import { motion } from "framer-motion";

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
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(
    null
  );
  const [selectedModality, setSelectedModality] = React.useState<string | null>(
    null
  );
  const [selectedLevel, setSelectedLevel] = React.useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = React.useState<string | null>(
    null
  );
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);

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
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex align-middle justify-center mb-10 mt-4 gap-6 bg-white w-fit m-auto py-4 px-10 rounded-2xl shadow-md"
    >
      <Dropdown
        id="language"
        options={languageOptions}
        selected={selectedLanguage}
        onChange={setSelectedLanguage}
        placeholder="Language"
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
      />
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
      <Dropdown
        id="level"
        options={levelOptions}
        selected={selectedLevel}
        onChange={setSelectedLevel}
        placeholder="Level"
        openDropdown={openDropdown}
        setOpenDropdown={setOpenDropdown}
      />

      <button
        onClick={handleApplyFilters}
        className="px-4 py-2 bg-rose-400 text-white rounded-lg hover:bg-rose-500 transition"
      >
        Apply Filters
      </button>

      <button
        onClick={handleResetFilters}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
      >
        Reset Filters
      </button>
    </motion.div>
  );
};
