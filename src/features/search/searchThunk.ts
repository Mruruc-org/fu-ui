import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProgramById, fetchPrograms } from "../../api/program-service";
import type { SearchFilters } from "../../types/filter.types";
import type { Program } from "../../types/program.types";

interface SearchThunkParams {
  query: string;
  filters: SearchFilters;
}

export const fetchProgramsThunk = createAsyncThunk<
  Program[],
  SearchThunkParams
>("search/fetchPrograms", async ({ query, filters }) => {
  const response = await fetchPrograms(query, filters);
  return response;
});

export const fetchProgramByIdThunk = createAsyncThunk<
  Program | undefined,
  number
>("search/fetchProgramById", async (programId: number) => {
  const response = await fetchProgramById(programId);
  return response;
});
