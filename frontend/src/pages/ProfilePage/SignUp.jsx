import { useState, useEffect } from "react";
import styles from "./LogIn.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUpOtpReceived } from "../../features/auth/authThunks";

export const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { otp } = useSelector((state) => state.auth);

  const [clientCredentials, setClientCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setClientCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimedClientCredentials = {
      username: clientCredentials.username.trim(),
      email: clientCredentials.email.trim(),
      password: clientCredentials.password.trim(),
    };

    dispatch(signUpOtpReceived(trimedClientCredentials));
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
                <button type="submit">sign-up</button>
                <button type="button" onClick={() => navigate("/login")}>
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
