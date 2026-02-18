import "./Root.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HeaderOne } from "./components/Header/HeaderOne";
import { HeaderTwo } from "./components/Header/HeaderTwo";
import { Outlet } from "react-router-dom";
import { checkMe } from "./features/auth/authThunks";
import { LogIn } from "./pages/ProfilePage/LogIn";
import { SignUp } from "./pages/ProfilePage/SignUp";

export const Root = () => {
  const dispatch = useDispatch();

  const { loading, isAuthenticated, isLogInClicked } = useSelector(
    (state) => state.auth,
  );
  useEffect(() => {
    dispatch(checkMe());
  }, [dispatch]);

  if (loading === true)
    return (
      <div className="first-loading-content">
        <h1>checking if you are an existing user...</h1>
      </div>
    );

  if (isAuthenticated === false) {
    return isLogInClicked ? <LogIn /> : <SignUp />;
  }

  return (
    <div className="root-container">
      <HeaderOne />
      <HeaderTwo />
      <Outlet />
    </div>
  );
};
