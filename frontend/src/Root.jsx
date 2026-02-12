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

  const { loading, isAuthenticated, error, user } = useSelector((state) => {
    return state.auth;
  });

  const isLoggingTriggered = useSelector(
    (state) => state.auth.isLoggingTriggered,
  );

  if (loading)
    return <div className="">checking if user already existed...</div>;

  if (!isAuthenticated && isLoggingTriggered) return <LogIn />; //<OtpVerification />
  if (!isLoggingTriggered) return <SignUp />;

  return (
    <div className="root-container">
      <HeaderOne />
      <HeaderTwo />
      <Outlet />
    </div>
  );
};
