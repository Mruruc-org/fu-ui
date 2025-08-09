import { programStaticData } from "../data";
import type { SearchFilters } from "../types/filter.types";
import type { Program } from "../types/program.types";

export const fetchPrograms = async (
  query: string,
  filters: SearchFilters
): Promise<Program[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const results = programStaticData.filter((program) => {
        // First, check if it matches the search query (if there is one)
        const matchesQuery =
          !query.trim() ||
          program.name.toLowerCase().includes(query.toLowerCase()) ||
          program.university.toLowerCase().includes(query.toLowerCase());

        // Then, check if it matches ALL active filters using AND conditions
        const minTuition = filters.tuitionMin ?? 0;
        const maxTuition = filters.tuitionMax ?? 10_000;
        const matchesFilters =
          (filters.level === "all" ||
            program.level.toLowerCase() === filters.level.toLowerCase()) &&
          (filters.field === "all" ||
            program.name
              .toLowerCase()
              .includes(filters.field.toLowerCase())) &&
          (filters.city === "all" ||
            (program.city?.toLowerCase() || "").includes(
              filters.city.toLowerCase()
            )) &&
          (filters.language === "all" ||
            program.language.toLowerCase() ===
              filters.language.toLowerCase()) &&
          program.tuition >= minTuition &&
          program.tuition <= maxTuition;

        // Program must match both query AND filters
        return matchesQuery && matchesFilters;
      });

      resolve(results);
    }, 1000);
  });
};
