import { useState, useEffect } from "react";
import styles from "./LogIn.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logInOtpReceived } from "../../features/auth/authThunks";

export const LogIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, successMessage, errorMessage, loading, isAuthenticated, otp } =
    useSelector((state) => state.auth);

  const [clientCredentials, setClientCredentials] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    let { name, value } = e.target;
    setClientCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimedClientCredentials = {
      email: clientCredentials.email.trim().toLowerCase(),
      password: clientCredentials.password.trim(),
    };

    dispatch(logInOtpReceived(trimedClientCredentials));

    if (otp.sent) {
      setClientCredentials((prev) => ({
        ...prev,
        email: "",
        password: "",
      }));
    }
  };

  // ✅ navigate to otp page after otp sent
  useEffect(() => {
    if (otp.sent) {
      navigate("/verify-otp");
    }
  }, [otp.sent, navigate]);

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
                  type="text"
                  name="email"
                  placeholder="your email"
                  value={clientCredentials.email}
                  onChange={handleOnChange}
                />
              </div>

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
