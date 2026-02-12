import styles from "../../pages/ProfilePage/LogIn.module.css";

export const OtpVerification = () => {
  return (
    <>
      <main className={styles["main-container-first-otp"]}>
        <section className={styles["main-container-second"]}>
          <article className={styles["main-container-third"]}>
            <h1 className={styles["login-main-heading"]}>please verify otp</h1>
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
                  <label htmlFor="otp">Otp :</label>
                  <input
                    id="otp"
                    type="password"
                    name="otp"
                    placeholder="Enter verification code"
                  />
                </div>

                <div className={styles["btn-container"]}>
                  <button type="submit">verify code</button>
                </div>
              </form>
            </div>
          </article>
        </section>
      </main>
    </>
  );
};
