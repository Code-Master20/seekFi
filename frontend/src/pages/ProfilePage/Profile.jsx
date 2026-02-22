import styles from "./Profile.module.css";
import bannerImg from "../../assets/bannerImg.png";
import { RiImageEditLine } from "react-icons/ri";
import { ImageUpload } from "../../components/Uploader/ImgUpload";
import profilePic from "../../assets/profilePic.jpg";
import { useState, useEffect, useRef } from "react";
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
  const profileSize = width * 0.22;

  return (
    <main className={styles["main-container"]}>
      <section className={styles["content-container"]}>
        <article className={styles["owner-window"]}>
          <img
            src={bannerImg}
            alt=""
            className={styles["bannar-img"]}
            height={width / 2.308}
          />
          <ImageUpload
            Icon={RiImageEditLine}
            className={styles["img-uploader"]}
          />
        </article>
        <article className={styles["owner-info"]}>
          <figure className={styles["name-pic"]}>
            <img
              src={profilePic}
              alt="Profile picture"
              height={profileSize}
              className={styles["profile-pic"]}
            />
            <figcaption className={styles["name"]}>Sahidur Miah</figcaption>
          </figure>
          <ul className={styles["stats"]}>
            <li>
              <span>following</span>
              <strong>1234</strong>
            </li>
            <li>
              <span>followers</span>
              <strong>34235</strong>
            </li>
            <li>
              <span>posts</span>
              <strong>3456543</strong>
            </li>
            <li>
              <span>friends</span>
              <strong>4532456</strong>
            </li>
          </ul>
        </article>
      </section>
    </main>
  );
};
