import { useState } from "react";
import styles from "./LogIn.module.css";
import { useSelector, useDispatch } from "react-redux";
import { isLogInClickedFun } from "../../features/auth/authSlice";

export const LogIn = () => {
  //reading true boolean from isSignUpTrigged-variable with redux-toolkit (useSelector())
  // const { isLogInClicked } = useSelector((state) => state.auth);

  //assigning true boolean to isSignUpTriggered-variable through isSignUpClicked reducer's function
  const dispatch = useDispatch();

  const returnToSignUp = () => {
    dispatch(isLogInClickedFun(false));
    localStorage.setItem("isLogInClicked", JSON.stringify(false));
  };

  const [clientCredentials, setClientCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSumbit = (e) => {
    e.preventDefault();
  };

  return (
    <main className={styles["main-container-first"]}>
      <section className={styles["main-container-second"]}>
        <article className={styles["main-container-third"]}>
          <h1 className={styles["login-main-heading"]}>please log in first</h1>
          <div className={styles["login-form-container"]}>
            <form onSubmit={handleSumbit} autoComplete="off">
              <div className={styles["input-elm"]}>
                <label htmlFor="email">Email :</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your email"
                />
              </div>

              <div className={styles["input-elm"]}>
                <label htmlFor="password">Password :</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="your password"
                />
              </div>

              <div className={styles["btn-container"]}>
                <button type="submit">log-in</button>
                <button type="button" onClick={returnToSignUp}>
                  sign-up
                </button>
              </div>
            </form>
          </div>
        </article>
      </section>
    </main>
  );
};
