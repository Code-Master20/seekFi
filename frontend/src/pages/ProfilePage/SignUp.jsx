import { useState } from "react";
import styles from "./LogIn.module.css";
import { useDispatch, useSelector } from "react-redux";
import { isLogInClicked, isSignUpClicked } from "../../features/auth/authSlice";
import { signUpOtpReceived } from "../../features/auth/authThunks";
import { OtpVerification } from "../../components/OtpVerification/OtpVerification";

export const SignUp = () => {
  const dispatch = useDispatch();
  const {
    user,
    isAuthenticated,
    isLogInTriggered,
    isSignUpTriggered,
    loading,
    errorMessage,
    successMessage,
    otp,
  } = useSelector((state) => state.auth);

  const [clientCredentials, setClientCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  //from sign-up-page to log-in-page toggling
  const returnToLogIn = () => {
    dispatch(isLogInClicked(true));
    dispatch(isSignUpClicked(false));
    sessionStorage.setItem(
      "authMode",
      JSON.stringify({
        isLogInTriggered: true,
        isSignUpTriggered: false,
      }),
    );
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

  if (otp.sent === true && isSignUpTriggered === true)
    return <OtpVerification />; //if otp sent true and isLOggingTriggered tre then run it during sign-up clicked

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
              </div>

              {/* Email */}
              <div className={styles["input-elm"]}>
                <label htmlFor="email">Email :</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your email"
                  value={clientCredentials.email}
                  onChange={handleOnChange}
                />
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
              </div>

              <div className={styles["btn-container"]}>
                <button type="submit">sign-up</button>
                <button type="button" onClick={() => returnToLogIn()}>
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
