import { useEffect } from "react";
import { useParams } from "react-router";
import Header from "../components/common/Header";
import NavigationBar from "../components/common/NavigationBar";
import ProgramDetail from "../components/program-details/ProgramDetail";
import { fetchProgramByIdThunk } from "../features/search/searchThunk";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

const ProgramDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const program = useAppSelector((state) => {
    return state.search.searchResults.find(
      (program) => program.id === Number(id)
    );
  });

  const status = useAppSelector((state) => state.search.status);
  const error = useAppSelector((state) => state.search.error);

  // 2. Use useEffect to handle data fetching if the program is not in the store
  useEffect(() => {
    // Check if the program exists and we're not currently loading
    if (!program && id && status === "idle") {
      dispatch(fetchProgramByIdThunk(Number(id)));
    }
  }, [program, id, status, dispatch]);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header centerSection={<NavigationBar />} />
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {program && <ProgramDetail program={program} />}

        {status === "loading" && !program && (
          <div className="flex items-center justify-center p-8">
            <p>Loading program details...</p>
          </div>
        )}

        {(status === "failed" || !program) && (
          <div className="flex flex-col items-center justify-center p-8 text-red-600">
            <p>Error: Program not found.</p>
            {error && <p className="text-sm text-gray-500 mt-2">{error}</p>}
          </div>
        )}
      </main>
    </div>
  );
};
export default ProgramDetailsPage;
