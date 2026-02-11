import { useState } from "react";
import styles from "./LogIn.module.css";
import { SignUp } from "./SignUp";
import { useSelector, useDispatch } from "react-redux";
import { isLoggingTask } from "../../features/auth/authSlice";

export const LogIn = () => {
  const dispatch = useDispatch();

  const returnToSignUp = () => {
    localStorage.setItem("isLoggingTriggered", JSON.stringify(false));
  };
  return (
    <main className={styles["main-container-first"]}>
      <section className={styles["main-container-second"]}>
        <article className={styles["main-container-third"]}>
          <h1 className={styles["login-main-heading"]}>please log in first</h1>
          <div className={styles["login-form-container"]}>
            <form autoComplete="off">
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
