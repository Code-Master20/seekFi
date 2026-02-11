import { useState } from "react";
import styles from "./LogIn.module.css";
import { useDispatch } from "react-redux";
import { isLoggingTask } from "../../features/auth/authSlice";

export const SignUp = () => {
  const dispatch = useDispatch();
  const returnToLogIn = () => {
    localStorage.setItem("isLoggingTriggered", JSON.stringify(true));
    dispatch(isLoggingTask(true));
  };
  return (
    <main className={styles["main-container-first"]}>
      <section className={styles["main-container-second"]}>
        <article className={styles["main-container-third"]}>
          <h1 className={styles["login-main-heading"]}>create account</h1>
          <div className={styles["login-form-container"]}>
            <form action="#" autoComplete="off">
              <div className={styles["input-elm"]}>
                <label htmlFor="username">Username :</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="your username"
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
                />
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
