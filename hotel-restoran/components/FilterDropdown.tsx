"use client";

import { useRef, useState } from "react";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { cn } from "@/lib/utils";

interface FilterDropdownProps<T extends string> {
  label: string;
  value: T | null;
  options: readonly T[];
  onChange: (value: T | null) => void;
  renderOption?: (option: T) => React.ReactNode;
}

export function FilterDropdown<T extends string>({
  label,
  value,
  options,
  onChange,
  renderOption,
}: FilterDropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setOpen(false));

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:border-gray-300"
      >
        {value ?? label}
        <svg
          className={cn("h-3.5 w-3.5 text-gray-500 transition-transform", open && "rotate-180")}
          viewBox="0 0 12 8"
          fill="none"
        >
          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute left-0 z-20 mt-1 min-w-[180px] overflow-hidden rounded-lg border border-gray-100 bg-white py-1 shadow-lg animate-pop-in"
        >
          {value && (
            <li>
              <button
                type="button"
                onClick={() => {
                  onChange(null);
                  setOpen(false);
                }}
                className="w-full px-4 py-2 text-left text-sm text-gray-400 hover:bg-gray-50"
              >
                Semua {label}
              </button>
            </li>
          )}
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                role="option"
                aria-selected={value === option}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={cn(
                  "w-full px-4 py-2 text-left text-sm hover:bg-gray-50",
                  value === option ? "font-semibold text-brand-green" : "text-gray-700"
                )}
              >
                {renderOption ? renderOption(option) : option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
