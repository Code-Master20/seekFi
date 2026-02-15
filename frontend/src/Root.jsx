import "./Root.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HeaderOne } from "./components/Header/HeaderOne";
import { HeaderTwo } from "./components/Header/HeaderTwo";
import { Outlet } from "react-router-dom";
import { checkMe } from "./features/auth/authThunks";
import { LogIn } from "./pages/ProfilePage/LogIn";
import { SignUp } from "./pages/ProfilePage/SignUp";

export const Root = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkMe());
  }, [dispatch]);

  const {
    loading,
    isAuthenticated,
    successMessage,
    errorMessage,
    isLogInClicked,
    user,
    status,
  } = useSelector((state) => state.auth);
  console.log(isLogInClicked);

  if (loading === true)
    return (
      <div className="first-loading-content">
        <h1>checking if you are an existing user...</h1>
      </div>
    );

  if (isAuthenticated === false) {
    // Backend decides first time view
    if (status === 500) {
      return isLogInClicked === false ? <LogIn /> : <SignUp />;
    }

    if (status === 401) {
      return isLogInClicked === true ? <LogIn /> : <SignUp />;
    }

    // fallback
    return isLogInClicked === true ? <LogIn /> : <SignUp />;
  }
  return (
    <div className="root-container">
      {isAuthenticated === true && (
        <>
          <HeaderOne />
          <HeaderTwo />
        </>
      )}
      <Outlet />
    </div>
  );
};
