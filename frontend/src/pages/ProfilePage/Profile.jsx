import styles from "./Profile.module.css";
import profilePic from "../../assets/profilePic.jpg";
import bannerImg from "../../assets/bannerImg.png";
import { useState, useEffect } from "react";
export const Profile = () => {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const screenWidthTracker = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", screenWidthTracker);
    return () => {
      window.removeEventListener("resize", screenWidthTracker);
    };
  }, []);
  console.log("inner width :", width);
  console.log("outerWidth:", window.outerWidth);
  return (
    <main className={styles["main-container"]}>
      <section className={styles["content-container"]}>
        <article className={styles["owner-window"]}>
          <img
            src={bannerImg}
            alt=""
            className={styles["bannar-img"]}
            height={width / 2.308}
            width={width - 14}
          />
          <div>
            <img
              src={profilePic}
              alt=""
              className={styles["profile-pic"]}
              height="90px"
            />
          </div>
        </article>
        <article></article>
      </section>
    </main>
  );
};
