import type {RouteObject} from "react-router";
import StudentLayout from "../layouts/StudentLayout";
import SearchResultsPage from "../pages/SearchResultsPage";
import StudentDiscovery from "../pages/StudentDiscovery";

const routes: RouteObject[] = [
    {
        path: "/",
        Component: StudentLayout,
        children: [
            {
                index: true,
                Component: StudentDiscovery,
            },
            {
                path: "discovery",
                Component: SearchResultsPage,
            },
        ],
    },
];

const getRoutes = () => {
    return routes;
};

export default getRoutes;
