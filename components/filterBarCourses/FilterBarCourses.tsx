import React, { Dispatch, SetStateAction } from 'react'
import styles from './filterBarCourses.module.css'
import { CourseFilters } from '@/types';
import { Dropdown } from '../UI/Dropdown';


const statusOptions = ["inProgress", "soon", "pending"];
const modalityOptions = ["Intensive", "Semi-Intensive", "Standar", "Private"];
const levelOptions = ["A1", "A2", "B1", "B2", "C1", "C2"];


type FilterBarCoursesProps = {
    filters: CourseFilters;
    setFilters: Dispatch<SetStateAction<CourseFilters>>;
}

export const FilterBarCourses = ({ filters, setFilters }: FilterBarCoursesProps) => {

    const [selectedStatus, setSelectedStatus] = React.useState<string | null>(null);
    const [selectedModality, setSelectedModality] = React.useState<string | null>(null);
    const [selectedLevel, setSelectedLevel] = React.useState<string | null>(null);


    return (
        <div className="flex align-middle justify-center mb-6 gap-6">
            <Dropdown
                options={statusOptions}
                selected={selectedStatus}
                onChange={setSelectedStatus}
                placeholder="Status"
            />
            <Dropdown
                options={modalityOptions}
                selected={selectedModality}
                onChange={setSelectedModality}
                placeholder="Modality"
            />
            <Dropdown
                options={levelOptions}
                selected={selectedLevel}
                onChange={setSelectedLevel}
                placeholder="Level"
            />

        </div>
    )
}
