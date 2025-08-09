import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { SearchFilters } from "../../types/filter.types";
import type { Program } from "../../types/program.types";
import { fetchProgramsThunk } from "./searchThunk";

interface SearchState {
  query: string;
  searchResults: Program[];
  resultCount: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  activeFilters: SearchFilters;
}

const initialState: SearchState = {
  query: "",
  searchResults: [],
  resultCount: 0,
  status: "idle",
  error: null,
  activeFilters: {
    level: "all",
    field: "all",
    city: "all",
    language: "english",
    tuitionMax: 10_000,
    tuitionMin: 0,
  },
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // action set the active filters
    setActiveFilters: (state, action: PayloadAction<SearchFilters>) => {
      state.activeFilters = action.payload;
    },
    // clear active filters
    clearActiveFilters: (state) => {
      state.activeFilters = initialState.activeFilters;
    },
    // action to set the search query
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    clearSearchQuery: (state) => {
      state.query = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProgramsThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProgramsThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchResults = action.payload;
        state.resultCount = action.payload.length;
      })
      .addCase(fetchProgramsThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch programs";
      });
  },
});

export const {
  setSearchQuery,
  clearSearchQuery,
  setActiveFilters,
  clearActiveFilters,
} = searchSlice.actions;

const searchReducer = searchSlice.reducer;
export default searchReducer;
