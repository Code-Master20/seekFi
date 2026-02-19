import "./Root.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HeaderOne } from "./components/Header/HeaderOne";
import { HeaderTwo } from "./components/Header/HeaderTwo";
import { Outlet } from "react-router-dom";
import { checkMe } from "./features/auth/authThunks";

export const Root = () => {
  const dispatch = useDispatch();
  const { loading, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkMe());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="first-loading-content">
        <h1>checking if you are an existing user...</h1>
      </div>
    );
  }

  return (
    <div className="root-container">
      {isAuthenticated && (
        <>
          <HeaderOne />
          <HeaderTwo />
        </>
      )}
      <Outlet />
    </div>
  );
};
