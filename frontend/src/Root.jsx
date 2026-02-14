import "./Root.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HeaderOne } from "./components/Header/HeaderOne";
import { HeaderTwo } from "./components/Header/HeaderTwo";
import { Outlet } from "react-router-dom";
import { checkMe } from "./features/auth/authThunks";
import { LogIn } from "./pages/ProfilePage/LogIn";
import { SignUp } from "./pages/ProfilePage/SignUp";
import { OtpVerification } from "./components/OtpVerification/OtpVerification";

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
    user,
    isLogInTriggered,
    isSignUpTriggered,
  } = useSelector((state) => state.auth);

  if (loading === true)
    return (
      <div className="first-loading-content">
        <h1>checking if you are an existing user...</h1>
      </div>
    );
  // console.log(!isAuthenticated);
  if (isAuthenticated === false && isLogInTriggered === false) {
    return <SignUp />;
  }

  if (
    isAuthenticated === false &&
    isLogInTriggered === true &&
    isSignUpTriggered === false
  ) {
    return <LogIn />;
  }

  return (
    <div className="root-container">
      <HeaderOne />
      <HeaderTwo />
      <Outlet />
    </div>
  );
};
