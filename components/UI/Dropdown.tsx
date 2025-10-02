// components/ui/Dropdown.tsx
"use client";

import React, { ReactNode, useState } from "react";
import { ChevronDown } from "lucide-react";

type DropdownProps<T> = {
    options: T[];
    selected: T | null;
    onChange: (value: T) => void;
    renderOption?: (option: T) => ReactNode;
    placeholder?: string;
};

export const Dropdown = <T extends string | number>({
    options,
    selected,
    onChange,
    renderOption,
    placeholder = "Select...",
}: DropdownProps<T>) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative inline-block">
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center px-3 py-2 border rounded-lg hover:bg-gray-100 focus:outline-none"
            >
                {selected || placeholder}
                <ChevronDown className="ml-1" size={16} />
            </button>

            {open && (
                <div className="absolute mt-1 w-full border rounded-lg bg-white shadow-lg z-50">
                    {options.map((option) => (
                        <div
                            key={option.toString()}
                            className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                            onClick={() => {
                                onChange(option);
                                setOpen(false);
                            }}
                        >
                            {renderOption ? renderOption(option) : option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
