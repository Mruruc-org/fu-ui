import {Search} from "lucide-react";
import CompactSearchBar from "../components/common/CompactSearchBar";
import Header from "../components/common/Header";
import FiltersSidebar from "../components/student-discovery/filters/FiltersSidebar";
import ProgramCard from "../components/student-discovery/ProgramCard";
import {clearSearchQuery} from "../features/search/searchSlice";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {fetchProgramsThunk} from "../features/search/searchThunk";

const SearchResultsPage = () => {
    const {query, activeFilters, status, searchResults, resultCount} =
        useAppSelector((state) => state.search);
    const dispatch = useAppDispatch();

    const clearSearch = () => {
        dispatch(clearSearchQuery());
        // Immediately fetch all results after clearing
        // To do this, we need to dispatch the thunk with an empty query
        dispatch(fetchProgramsThunk({query: "", filters: activeFilters}));
    };

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Header centerSection={<CompactSearchBar/>}/>

            <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <FiltersSidebar/>

                    <div className="lg:col-span-3">
                        {/* Results Header */}
                        <div
                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 pb-4 border-b border-gray-200">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {status === "loading"
                                        ? "Searching..."
                                        : `${resultCount} Programs Found`}
                                </h2>
                                <p className="text-gray-600 mt-1">
                                    {query && `Results for "${query}"`}
                                </p>
                            </div>

                            <div className="flex items-center gap-3 mt-4 sm:mt-0">
                <span className="text-sm font-medium text-gray-600">
                  Sort by:
                </span>
                                <select
                                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white min-w-[140px]">
                                    <option>Relevance</option>
                                    <option>Top Rated</option>
                                    <option>Tuition (Low to High)</option>
                                    <option>Tuition (High to Low)</option>
                                    <option>Newest</option>
                                    <option>Deadline</option>
                                </select>
                            </div>
                        </div>

                        {/* Loading State */}
                        {status === "loading" && (
                            <div className="flex items-center justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                <span className="ml-3 text-gray-600">
                  Searching programs...
                </span>
                            </div>
                        )}

                        {/* Results Grid */}
                        {status === "succeeded" && (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                                {searchResults.map((program) => (
                                    <ProgramCard key={program.id} program={program}/>
                                ))}
                            </div>
                        )}

                        {/* Empty State */}
                        {status === "succeeded" && searchResults.length === 0 && (
                            <div className="text-center py-12">
                                <div className="text-gray-400 mb-4">
                                    <Search className="w-16 h-16 mx-auto"/>
                                </div>
                                <h3 className="text-xl font-medium text-gray-900 mb-2">
                                    No programs found
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Try adjusting your search terms or filters to find what you're
                                    looking for.
                                </p>
                                <button
                                    onClick={() => clearSearch()}
                                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                                    Clear Search
                                </button>
                            </div>
                        )}

                        {/* Load More Button */}
                        {status === "succeeded" && searchResults.length > 0 && (
                            <div className="text-center mt-12">
                                <button
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg">
                                    Load More Results
                                </button>
                                <p className="text-sm text-gray-500 mt-3">
                                    Showing {searchResults.length} of {resultCount} programs
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SearchResultsPage;
