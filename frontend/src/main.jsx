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
import { Provider, useSelector } from "react-redux";
import { store } from "./store/store.js";
import { HomeFeed } from "./pages/HomeFeed/HomeFeed.jsx";
import { VideoFeed } from "./pages/VideoFeed/VideoFeed.jsx";
import { PhotoFeed } from "./pages/PhotoFeed/PhotoFeed.jsx";
import { PostFeed } from "./pages/PostFeed/PostFeed.jsx";
import { PeopleHub } from "./pages/PeopleHub/PeopleHub.jsx";
import { NotificationCenter } from "./pages/NotificationCenter/NotificationCenter.jsx";
import { Profile } from "./pages/ProfilePage/Profile.jsx";
import { LogIn } from "./pages/ProfilePage/LogIn.jsx";
import { SignUp } from "./pages/ProfilePage/SignUp.jsx";
import { OtpVerification } from "./components/OtpVerification/OtpVerification.jsx";
import { isAuthenticationChecked } from "./features/auth/authSlice.js";
import { Navigate } from "react-router-dom";
import { ProtectedRoute } from "./features/ProtectedRoute.jsx";

//creating routes for different pages
const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Navigate to="/login" replace />} />
      <Route path="login" element={<LogIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="verify-otp" element={<OtpVerification />} />

      {/* Protected routes */}
      <Route
        path="home-feed"
        element={
          <ProtectedRoute>
            <HomeFeed />
          </ProtectedRoute>
        }
      />
      <Route
        path="video-feed"
        element={
          <ProtectedRoute>
            <VideoFeed />
          </ProtectedRoute>
        }
      />
      <Route
        path="photo-feed"
        element={
          <ProtectedRoute>
            <PhotoFeed />
          </ProtectedRoute>
        }
      />
      <Route
        path="post-feed"
        element={
          <ProtectedRoute>
            <PostFeed />
          </ProtectedRoute>
        }
      />
      <Route
        path="people"
        element={
          <ProtectedRoute>
            <PeopleHub />
          </ProtectedRoute>
        }
      />
      <Route
        path="notifications"
        element={
          <ProtectedRoute>
            <NotificationCenter />
          </ProtectedRoute>
        }
      />
      <Route
        path="profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Route>,
  ),
);

//using defined routes inside RouterProvider to reflect different pages
// on visit the different url
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={Router}></RouterProvider>
    </Provider>
  </StrictMode>,
);
