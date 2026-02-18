import { useState } from "react";
import styles from "./LogIn.module.css";
import { useNavigate } from "react-router-dom";

export const LogIn = () => {
  const navigate = useNavigate();

  const [clientCredentials, setClientCredentials] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch login thunk here later
  };

  return (
    <main className={styles["main-container-first"]}>
      <section className={styles["main-container-second"]}>
        <article className={styles["main-container-third"]}>
          <h1 className={styles["login-main-heading"]}>please log in first</h1>
          <div className={styles["login-form-container"]}>
            <form onSubmit={handleSubmit} autoComplete="off">
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
                <button type="button" onClick={() => navigate("/signup")}>
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
