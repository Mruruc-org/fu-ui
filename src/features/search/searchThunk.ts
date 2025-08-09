import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchPrograms } from "../../api/program-service";
import type { SearchFilters } from "../../types/filter.types";
import type { Program } from "../../types/program.types";

interface SearchThunkParams {
  query: string;
  filters: SearchFilters;
}

export const fetchProgramsThunk = createAsyncThunk<
  Program[], // Type of the return value on success
  SearchThunkParams // Type of the argument passed to the thunk
>("search/fetchPrograms", async ({ query, filters }) => {
  const response = await fetchPrograms(query, filters);
  return response;
});
