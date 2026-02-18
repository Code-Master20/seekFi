import { useEffect, useState } from "react";
import styles from "./LogIn.module.css";
import { useDispatch, useSelector } from "react-redux";
import { isLogInClickedFun, isOtpSent } from "../../features/auth/authSlice";
import { signUpOtpReceived } from "../../features/auth/authThunks";
import { OtpVerification } from "../../components/OtpVerification/OtpVerification";
import { InvalidInputTracker } from "../../components/InvalidInputTracker/InvalidInputTracker";

export const SignUp = () => {
  const [storedOtp, setStoredOtp] = useState(false);
  const [storedAuthentication, setStoredAuthentication] = useState(false);
  const dispatch = useDispatch();
  const {
    user,
    isAuthenticated,
    isLogInClicked,
    loading,
    errorMessage,
    successMessage,
    status,
    success,
    otp,
  } = useSelector((state) => state.auth);

  const [clientCredentials, setClientCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  //from sign-up-page to log-in-page toggling

  const returnToLogIn = () => {
    dispatch(isLogInClickedFun(true));
    localStorage.setItem("isLogInClicked", JSON.stringify(true));
  };

  //receiving value from input-change field
  const handleOnChange = (e) => {
    // console.log(e.target)
    const { name, value } = e.target;
    setClientCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // trimming inputs before sending to the thunk
    const { username, email, password } = clientCredentials;
    const trimedClientCredentials = {
      ...clientCredentials,
      username: username.trim(),
      email: email.trim(),
      password: password.trim(),
    };
    dispatch(signUpOtpReceived(trimedClientCredentials)); //sending clientCredentials to thunk for sending request to the database with these credentials
    setClientCredentials((prev) => ({
      ...prev,
      username: "",
      email: "",
      password: "",
    }));
  };

  useEffect(() => {
    setStoredOtp(JSON.parse(localStorage.getItem("otp-sent")));
    setStoredAuthentication(
      JSON.parse(localStorage.getItem("isAuthenticated")),
    );
  }, [otp.sent, storedOtp, storedAuthentication]);

  if (
    (otp.sent === true || storedOtp === true) &&
    (isAuthenticated === false || storedAuthentication === false)
  )
    return <OtpVerification purpose="signup" />; //if otp sent true and isLOggingTriggered tre then run it during sign-up clicked
  return (
    <main className={styles["main-container-first"]}>
      <section className={styles["main-container-second"]}>
        <article className={styles["main-container-third"]}>
          <h1 className={styles["login-main-heading"]}>create account</h1>
          <div className={styles["login-form-container"]}>
            <form onSubmit={handleSubmit}>
              <div className={styles["input-elm"]}>
                <label htmlFor="username">Username :</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="your username"
                  value={clientCredentials.username}
                  onChange={handleOnChange}
                />
                {/* {success === false && <InvalidInputTracker />} */}
              </div>

              {/* Email */}
              <div className={styles["input-elm"]}>
                <label htmlFor="email">Email :</label>
                <input
                  id="email"
                  type="text"
                  name="email"
                  placeholder="your email"
                  value={clientCredentials.email}
                  onChange={handleOnChange}
                />
                {/* {success === false && <InvalidInputTracker />} */}
              </div>

              {/* Password */}
              <div className={styles["input-elm"]}>
                <label htmlFor="password">Password :</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="your password"
                  value={clientCredentials.password}
                  onChange={handleOnChange}
                />
                {/* {success === false && <InvalidInputTracker />} */}
              </div>

              <div className={styles["btn-container"]}>
                <button type="submit">sign-up</button>
                <button type="button" onClick={returnToLogIn}>
                  log-in
                </button>
              </div>
            </form>
          </div>
        </article>
      </section>
    </main>
  );
};
