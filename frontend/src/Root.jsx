import "./Root.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkMe } from "./features/auth/authThunks";
import { HeaderOne } from "./components/Header/HeaderOne";
import { HeaderTwo } from "./components/Header/HeaderTwo";
import { Outlet } from "react-router-dom";

export const Root = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, checked, loading } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    dispatch(checkMe());
  }, [dispatch]);

  // Wait until /me finishes
  if (!checked || loading) {
    return <p>Checking authentication...</p>;
  }

  // Not logged in → ONLY login page
  if (!isAuthenticated) {
    return <Outlet />; // this will render LogIn
  }

  // Logged in → headers + pages
  return (
    <div className="root-container">
      <HeaderOne />
      <HeaderTwo />
      <Outlet />
    </div>
  );
};
