import styles from "./HeaderTwo.module.css";
import { CiHome, CiImageOn } from "react-icons/ci";
import { PiVideoLight } from "react-icons/pi";
import { BsPeople } from "react-icons/bs";
import { IoIosNotificationsOutline } from "react-icons/io";
import { TbPhotoVideo } from "react-icons/tb";

export const HeaderTwo = () => {
  return (
    <header className={styles["header-container"]}>
      <nav>
        <section>
          <article>
            <CiHome />
          </article>
          <article>
            <PiVideoLight />
          </article>
          <article>
            <CiImageOn />
          </article>
          <article>
            <TbPhotoVideo />
          </article>
          <article>
            <BsPeople />
          </article>
          <article>
            <IoIosNotificationsOutline />
          </article>
        </section>
      </nav>
    </header>
  );
};
