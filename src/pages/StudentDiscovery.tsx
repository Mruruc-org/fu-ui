import { Search, X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import Header from "../components/common/Header";
import NavigationBar from "../components/common/NavigationBar";
import { setSearchQuery } from "../features/search/searchSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

const PROGRAMS_PATH = "/programs";

const StudentDiscovery = () => {
  const navigate = useNavigate();
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useAppDispatch();
  const query = useAppSelector((state) => state.search.query);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.trim()) {
      navigate(PROGRAMS_PATH);
    }
  };
  const handleSearch = (term?: string) => {
    if (term?.trim()) {
      dispatch(setSearchQuery(term));
    }
    navigate(PROGRAMS_PATH);
  };
  const handleBrowseAllPrograms = () => {
    dispatch(setSearchQuery(""));
    navigate(PROGRAMS_PATH);
  };

  const handleClearSearch = () => {
    dispatch(setSearchQuery(""));
  };

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans">
      <Header centerSection={<NavigationBar />} />
      {/* Main Content */}
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Hero Section with Search */}
        <div>
          <div className="py-12 text-center">
            {/* Hero Content */}
            <div className="mb-8">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-4 bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
                Find Your Perfect Program
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Explore top-tier Bachelor's and Master's degrees at leading
                universities in Poland.
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="relative group">
                <button
                  type="button"
                  onClick={() => handleSearch()}
                  aria-label="Submit search"
                  className="absolute left-5 top-1/2 -translate-y-1/2 z-10">
                  <Search
                    className={`w-5 h-5 transition-colors duration-200 ${
                      isFocused ? "text-blue-500" : "text-gray-400"
                    }`}
                  />
                </button>

                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search programs, universities, or fields of study..."
                  value={query}
                  onChange={handleQueryChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className={`w-full pl-14 pr-12 py-4 text-base bg-white border-2 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl ${
                    isFocused
                      ? "border-blue-500 ring-4 ring-blue-100 shadow-xl"
                      : "border-gray-200 hover:border-gray-300"
                  } focus:outline-none placeholder:text-gray-400 text-gray-700`}
                />

                {/* Clear Button */}
                {query && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute right-5 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 group"
                    aria-label="Clear search">
                    <X className="w-4 h-4 text-gray-400 group-hover:text-gray-600" />
                  </button>
                )}

                {/* Search Suggestions Dropdown */}
                {isFocused && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-10 overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Popular searches
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "Computer Science",
                          "Business Administration",
                          "Engineering",
                          "Medicine",
                          "Law",
                        ].map((term) => (
                          <button
                            key={term}
                            onMouseDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            onClick={() => handleSearch(term)}
                            className="px-3 py-1.5 text-sm bg-gray-50 hover:bg-blue-50 hover:text-blue-600 text-gray-600 rounded-full transition-colors duration-200">
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <span>Press</span>
                        <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 border border-gray-300 rounded text-gray-600">
                          Enter
                        </kbd>
                        <span>to search</span>
                      </p>
                    </div>
                  </div>
                )}
              </form>

              {/* Search Stats */}
              <div className="mt-4 text-sm text-gray-500">
                <span>✨ Over 500+ programs available • Updated daily</span>
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-wrap justify-center gap-3 mt-6">
                <button
                  onClick={handleBrowseAllPrograms}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-full transition-all duration-200 shadow-lg hover:shadow-xl">
                  Browse All Programs
                </button>
                <button className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium border border-gray-300 rounded-full transition-all duration-200">
                  University Guide
                </button>
                <button className="px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 text-sm font-medium border border-gray-300 rounded-full transition-all duration-200">
                  Scholarship Info
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentDiscovery;
