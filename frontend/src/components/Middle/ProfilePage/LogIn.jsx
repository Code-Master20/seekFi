import { useState } from "react";
import styles from "./LogIn.module.css";
export const LogIn = () => {
  const [loggingSuccess, setLoggingSuccess] = useState(false);
  return (
    <main className={styles["main-container-first"]}>
      <section className={styles["main-container-second"]}>
        <article className={styles["main-container-third"]}>
          <h1 className={styles["login-main-heading"]}>please log in first</h1>
          <div className={styles["login-form-container"]}>
            <form action="#" autoComplete="off">
              <div className={styles["input-elm"]}>
                <label htmlFor="email">Email :</label>
                <input
                  id="email"
                  type="email"
                  placeholder="your email"
                  autoComplete="off"
                  name="email"
                />
              </div>
              <div className={styles["input-elm"]}>
                <label htmlFor="password">Password :</label>
                <input
                  id="password"
                  type="password"
                  placeholder="your password"
                  autoComplete="off"
                  name="password"
                />
              </div>
              <div className={styles["btn-container"]}>
                <button type="submit">log-in</button>
                {!loggingSuccess && <button>sign-up</button>}
              </div>
            </form>
          </div>
        </article>
      </section>
    </main>
  );
};
