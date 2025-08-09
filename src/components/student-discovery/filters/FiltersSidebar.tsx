import { Filter } from "lucide-react";
import {
  clearActiveFilters,
  setActiveFilters,
} from "../../../features/search/searchSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import type { SearchFilters } from "../../../types/filter.types";
import filterConfig from "./filterConfig";
import FilterDropdown from "./FilterDropdown";
import TuitionRangeSlider from "./TuitionRangeSlider";

const FiltersSidebar = () => {
  const dispatch = useAppDispatch();
  const activeFilters = useAppSelector((state) => state.search.activeFilters);

  const handleFilterChange = (
    filterName: keyof SearchFilters,
    value: string
  ) => {
    dispatch(setActiveFilters({ ...activeFilters, [filterName]: value }));
  };

  const handleTuitionChange = (value: [number, number]) => {
    dispatch(
      setActiveFilters({
        ...activeFilters,
        tuitionMin: value[0],
        tuitionMax: value[1],
      })
    );
  };

  const handleClearFilters = () => {
    dispatch(clearActiveFilters());
  };

  return (
    <aside className="lg:col-span-1 lg:sticky lg:top-32 self-start">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <Filter className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">Filters</h2>
          </div>
          <button
            onClick={handleClearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Clear All
          </button>
        </div>

        {filterConfig.map((filter) => (
          <FilterDropdown
            key={filter.filterKey}
            title={filter.title}
            options={filter.options}
            value={`${activeFilters[filter.filterKey]}`}
            onChange={(value) => handleFilterChange(filter.filterKey, value)}
          />
        ))}

        <TuitionRangeSlider
          value={[
            activeFilters.tuitionMin ?? 0,
            activeFilters.tuitionMax ?? 10000,
          ]}
          max={10000}
          step={500}
          onChange={handleTuitionChange}
        />
      </div>
    </aside>
  );
};

export default FiltersSidebar;
