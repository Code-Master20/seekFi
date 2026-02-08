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
import { HomeFeed } from "./components/Middle/HomeFeed/HomeFeed.jsx";
import { VideoFeed } from "./components/Middle/VideoFeed/VideoFeed.jsx";
import { PhotoFeed } from "./components/Middle/PhotoFeed/PhotoFeed.jsx";
import { PostFeed } from "./components/Middle/PostFeed/PostFeed.jsx";
import { PeopleHub } from "./components/Middle/PeopleHub/PeopleHub.jsx";
import { NotificationCenter } from "./components/Middle/NotificationCenter/NotificationCenter.jsx";
import { Profile } from "./components/Middle/ProfilePage/Profile.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

//creating routes for different pages
const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<HomeFeed />}></Route>
      <Route path="video-feed" element={<VideoFeed />}></Route>
      <Route path="photo-feed" element={<PhotoFeed />}></Route>
      <Route path="post-feed" element={<PostFeed />}></Route>
      <Route path="people" element={<PeopleHub />}></Route>
      <Route path="notifications" element={<NotificationCenter />}></Route>
      <Route path="profile" element={<Profile />}></Route>
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
