import { programStaticData } from "../data";
import type { SearchFilters } from "../types/filter.types";
import type { Program } from "../types/program.types";

const API_URI = "http://localhost:8080/api/v1/programs";

export async function fetchProgramById(
  programId: number
): Promise<Program | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const program = programStaticData.find((p) => p.id === programId);
      resolve(program);
    }, 100);
  });
}

export const fetchPrograms = async (
  query: string,
  filters: SearchFilters,
  page: number = 1,
  perPage: number = 10
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
            program.name.toLowerCase().includes(filters.field.toLowerCase())) &&
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
    }, 100);
  });
};

// const safeQuery = query?.trim() || "";

// const params = new URLSearchParams({
//   query: safeQuery,
//   page: page.toString(),
//   perPage: perPage.toString(),
// });

// const url = `${API_URI}?${params.toString()}`;
// console.log("Fetching programs from:", url); // Debug log

// return fetch(url)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`Network response was not ok: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then((data) => {
//     if (Array.isArray(data)) return data as Program[];
//     if (data.programs) return data.programs as Program[];
//     console.warn("Unexpected API format:", data);
//     return [];
//   })
//   .catch((error) => {
//     console.error("Error fetching programs:", error);
//     return [];
//   });
