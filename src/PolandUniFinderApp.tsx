import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router";
import getRoutes from "./routes/student-routes";
import { Provider } from "react-redux";
import store from "./store/store";

const routes: RouteObject[] = getRoutes();

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
