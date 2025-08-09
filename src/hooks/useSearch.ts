import { useCallback } from "react";
import {
  clearSearchQuery,
  setSearchQuery,
} from "../features/search/searchSlice";
import { fetchProgramsThunk } from "../features/search/searchThunk";
import { useAppDispatch, useAppSelector } from "./hooks";

/**
 * @param onSuccess - Optional callback function to execute after a successful search.
 * Receives the search query as an argument.
 */
interface UseSearchParams {
  onSuccess?: (query: string) => void;
}

/**
 * A custom hook to manage search state and actions.
 * It encapsulates the logic for updating the search query,
 * clearing it, and triggering the search fetch operation.
 */
const useSearch = ({ onSuccess }: UseSearchParams = {}) => {
  const dispatch = useAppDispatch();
  const { query, activeFilters } = useAppSelector((state) => state.search);

  /**
   * Handles changes to the search input field.
   */
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  /**
   * Clears the search query in the Redux store.
   */
  const handleClearSearch = () => {
    dispatch(clearSearchQuery());
    // Immediately fetch all results after clearing
    // To do this, we need to dispatch the thunk with an empty query
    dispatch(fetchProgramsThunk({ query: "", filters: activeFilters }));
  };

  /**
   * Triggers the search operation.
   * Dispatches the fetch thunk and executes the onSuccess callback if provided.
   * @param searchTerm - The specific term to search for. Defaults to the current query in the store.
   */
  const handleSearch = useCallback(
    async (searchTerm?: string) => {
      const finalQuery =
        typeof searchTerm === "string" ? searchTerm : query.trim();
      //if (!finalQuery) return;
      try {
        // We set the query just in case a specific searchTerm was passed (e.g., from a suggestion button)
        if (typeof searchTerm === "string") {
          dispatch(setSearchQuery(searchTerm));
        }

        // Dispatch the thunk and wait for it to complete
        await dispatch(
          fetchProgramsThunk({ query: finalQuery, filters: activeFilters })
        ).unwrap(); // .unwrap() will throw an error if the thunk is rejected

        // If the thunk was successful, execute the callback
        onSuccess?.(finalQuery);
      } catch (error) {
        console.error("Search failed:", error);
        // Optionally, you could show a toast notification here
      }
    },
    [query, activeFilters, dispatch, onSuccess]
  );

  return {
    searchQuery: query,
    handleQueryChange,
    handleClearSearch,
    handleSearch,
  };
};

export default useSearch;
