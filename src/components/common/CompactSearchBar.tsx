import { Search, X } from "lucide-react";
import { act, useEffect, useState } from "react";
import useSearch from "../../hooks/useSearch";

const DEBOUNCE_DELAY = 500; // 500ms delay before auto-searching

const CompactSearchBar = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const { searchQuery, handleQueryChange, handleClearSearch, handleSearch } =
    useSearch();
  // const { query, activeFilters } = useAppSelector((state) => state.search);
  // const dispatch = useAppDispatch();

  // // a memoized function to trigger the search thunk
  // const triggerSearch = useCallback(() => {
  //   dispatch(fetchProgramsThunk({ query, filters: activeFilters }));
  // }, [query, activeFilters, dispatch]);

  // // useEffect for debounced searching as the user types
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     if (query.trim() !== "") {
  //       triggerSearch();
  //     }
  //   }, DEBOUNCE_DELAY);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [query, activeFilters, triggerSearch]);

  // // Handler for immediate search (Enter key or click)
  // const handleImmediateSearch = (event?: React.FormEvent) => {
  //   event?.preventDefault();
  //   triggerSearch();
  // };

  // const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   dispatch(setSearchQuery(event.target.value));
  // };
  // const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === "Enter") {
  //     handleImmediateSearch();
  //   }
  // };

  // const clearSearch = () => {
  //   dispatch(clearSearchQuery());
  //   // Immediately fetch all results after clearing
  //   // To do this, we need to dispatch the thunk with an empty query
  //   dispatch(fetchProgramsThunk({ query: "", filters: activeFilters }));
  // };

  useEffect(() => {
    const timer = setTimeout(() => {
      //if (searchQuery.trim() !== "") {
        handleSearch();
      //}
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timer);
  }, [searchQuery, handleSearch]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch();
    }
  };

  return (
    <div className="flex-1 max-w-2xl mx-6">
      <div className="relative">
        <button
          onClick={() => handleSearch() /* handleImmediateSearch() */}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-1"
          aria-label="Submit search">
          <Search
            className={`w-5 h-5 transition-colors duration-200 ${
              isSearchFocused ? "text-blue-500" : "text-gray-400"
            }`}
          />
        </button>

        <input
          type="text"
          placeholder="Search programs, universities, or fields..."
          value={searchQuery}
          onChange={handleQueryChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setIsSearchFocused(false)}
          className={`w-full pl-12 pr-12 py-3 text-base bg-white border-2 rounded-xl transition-all duration-200 ${
            isSearchFocused
              ? "border-blue-500 ring-4 ring-blue-100"
              : "border-gray-300 hover:border-gray-400"
          } focus:outline-none placeholder:text-gray-400 text-gray-700 shadow-sm`}
        />

        {searchQuery && (
          <button
            onClick={handleClearSearch}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
            aria-label="Clear search">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>
    </div>
  );
};
export default CompactSearchBar;
