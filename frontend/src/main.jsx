import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Root } from "./Root.jsx";
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import { Home } from "./components/Middle/Home/Home.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

//creating routes for different pages
const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />}></Route>
    </Route>,
  ),
);

//using defined routes inside RouterProvider to reflect different pages
// on visit the different url
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/*everything can access store */}
    <Provider store={store}>
      <RouterProvider router={Router}></RouterProvider>
    </Provider>
  </StrictMode>,
);
