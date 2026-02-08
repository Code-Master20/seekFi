import styles from "./LogIn.module.css";
export const LogIn = () => {
  return (
    <main className={styles["main-container-first"]}>
      <section className={styles["main-container-second"]}>
        <article className={styles["main-container-third"]}>
          <h1 className={styles["login-main-heading"]}>please log in first</h1>
          <div className={styles["login-form-container"]}>
            <form action="#">
              <label htmlFor="email">emali</label>
              <input id="email" type="email" placeholder="you email" />
              <label htmlFor="password">password</label>
              <input
                id="password"
                type="password"
                placeholder="your password"
              />
              <button type="submit">log-in</button>
            </form>
          </div>
        </article>
      </section>
    </main>
  );
};
