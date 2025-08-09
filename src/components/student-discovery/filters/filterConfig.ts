import type { SearchFilters } from "../../../types/filter.types";

const filterConfig = [
  {
    title: "Program Level",
    filterKey: "level" as keyof SearchFilters,
    options: [
      { value: "all", label: "All Levels" },
      { value: "bachelor", label: "Bachelor" },
      { value: "master", label: "Master" },
      { value: "phd", label: "PhD" },
    ],
  },
  {
    title: "Field of Study",
    filterKey: "field" as keyof SearchFilters,
    options: [
      { value: "all", label: "All Fields" },
      { value: "technology", label: "Technology" },
      { value: "business", label: "Business" },
      { value: "engineering", label: "Engineering" },
      { value: "medicine", label: "Medicine" },
      { value: "arts", label: "Arts" },
      { value: "science", label: "Science" },
    ],
  },
  {
    title: "City",
    filterKey: "city" as keyof SearchFilters,
    options: [
      { value: "all", label: "All Cities" },
      { value: "warsaw", label: "Warsaw" },
      { value: "krakow", label: "Kraków" },
      { value: "wroclaw", label: "Wrocław" },
      { value: "gdansk", label: "Gdańsk" },
    ],
  },
  {
    title: "Language",
    filterKey: "language" as keyof SearchFilters,
    options: [
      { value: "english", label: "English" },
      { value: "polish", label: "Polish" },
      { value: "both", label: "Both" },
    ],
  },
];

export default filterConfig;
