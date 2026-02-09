import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../features/auth/authThunks";
import styles from "./LogIn.module.css";

export const LogIn = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      loginUser({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }),
    );
  };

  return (
    <main className={styles["main-container-first"]}>
      <section className={styles["main-container-second"]}>
        <article className={styles["main-container-third"]}>
          <h1 className={styles["login-main-heading"]}>please log in first</h1>
          
          <div className={styles["login-form-container"]}>
            <form onSubmit={handleSubmit} autoComplete="off">
              <div className={styles["input-elm"]}>
                <label htmlFor="username">Username :</label>
                <input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="your username"
                />
              </div>

              <div className={styles["input-elm"]}>
                <label htmlFor="email">Email :</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your email"
                />
              </div>

              <div className={styles["input-elm"]}>
                <label htmlFor="password">Password :</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="your password"
                />
              </div>

              {error && <p className={styles.error}>{error}</p>}

              <div className={styles["btn-container"]}>
                <button type="submit" disabled={loading}>
                  {loading ? "logging in..." : "log-in"}
                </button>
              </div>
            </form>
          </div>
        </article>
      </section>
    </main>
  );
};
