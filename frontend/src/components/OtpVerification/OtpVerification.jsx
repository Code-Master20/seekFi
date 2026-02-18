import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../pages/ProfilePage/LogIn.module.css";
import { useDispatch, useSelector } from "react-redux";
import { otpVerifiedAndSignedUp } from "../../features/auth/authThunks";

export const OtpVerification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [clientCredentials, setClientCredentials] = useState({
    email: user?.email || storedUser?.email || "",
    otp: "",
    purpose: "signup",
  });

  useEffect(() => {
    if (user?.email) {
      setClientCredentials((prev) => ({
        ...prev,
        email: user.email,
      }));
    }
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setClientCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(otpVerifiedAndSignedUp(clientCredentials));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home-feed");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <main className={styles["main-container-first-otp"]}>
        <section className={styles["main-container-second"]}>
          <article className={styles["main-container-third"]}>
            <h1 className={styles["login-main-heading"]}>please verify otp</h1>
            <div className={styles["login-form-container"]}>
              <form autoComplete="off" onSubmit={handleSubmit}>
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
                  <label htmlFor="otp">Otp :</label>
                  <input
                    id="otp"
                    type="text"
                    name="otp"
                    placeholder="Enter verification code"
                    value={clientCredentials.otp}
                    onChange={handleOnChange}
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
