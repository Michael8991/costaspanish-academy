"use client"

import React, { ReactNode, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type DropdownProps<T> = {
    id: string;
    options: T[];
    selected: T | null;
    onChange: (value: T) => void;
    renderOption?: (option: T) => ReactNode;
    placeholder?: string;
    openDropdown: string | null;
    setOpenDropdown: (id: string | null) => void;
};

export const Dropdown = <T extends string | number>({
    id,
    options,
    selected,
    onChange,
    renderOption,
    placeholder = "Select...",
    openDropdown,
    setOpenDropdown
}: DropdownProps<T>) => {
    const isOpen = openDropdown === id;
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setOpenDropdown]);

    const handleButtonClick = () => {
        setOpenDropdown(isOpen ? null : id);
    };

    const handleSelect = (option: T) => {
        onChange(option); // Actualiza el selected en el padre
        setOpenDropdown(null); // Cierra el dropdown
    };

    return (
        <div ref={dropdownRef} className="relative inline-block">
            <button
                onClick={handleButtonClick}
                className="flex items-center px-3 py-2 border rounded-lg hover:bg-gray-100 focus:outline-none"
            >
                {/* {selected ? (renderOption ? renderOption(selected) : selected) : placeholder} */}
                {selected !== null
                    ? renderOption
                        ? renderOption(selected)
                        : selected.toString()
                    : placeholder}

                <ChevronDown className="ml-1" size={16} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute mt-1 max-w-xs border rounded-lg bg-white shadow-lg z-50"
                    >
                        {options.map((option) => (
                            <div
                                key={option.toString()}
                                className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                                onClick={() => handleSelect(option)}
                            >
                                {renderOption ? renderOption(option) : option}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};