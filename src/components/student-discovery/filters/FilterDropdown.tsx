import { ChevronDown } from "lucide-react";
import React from "react";

interface FilterDropdownProps {
  title: string;
  value: string;
  options: {
    value: string;
    label: string;
  }[];
  onChange: (value: string) => void;
}

/**
 * A reusable, styled dropdown select component for filtering.
 */
const FilterDropdown = ({
  title,
  value,
  options,
  onChange,
}: FilterDropdownProps) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="relative mb-4">
      <label className="text-xs font-semibold text-gray-500 mb-2 block">
        {title}
      </label>
      <select
        value={value}
        onChange={handleSelectChange}
        className="w-full appearance-none bg-gray-50 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="w-4 h-4 absolute right-3 top-[34px] text-gray-400 pointer-events-none" />
    </div>
  );
};

export default FilterDropdown;
