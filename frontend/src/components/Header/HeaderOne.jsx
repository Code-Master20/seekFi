import seekFint from "../../assets/seekFint.png";
import styles from "./HeaderOne.module.css";
import { FiSearch } from "react-icons/fi";
import { RiMessengerLine } from "react-icons/ri";
import { MdAddCircleOutline } from "react-icons/md";
import { HiOutlineSortDescending } from "react-icons/hi";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isDashboard } from "../../features/pageTracker/pageSlice";
// import { FaUsersBetweenLines } from "react-icons/fa6";
export const HeaderOne = () => {
  const dispatch = useDispatch();
  //to track current width of the screen
  const [width, setWidth] = useState(window.outerWidth);

  useEffect(() => {
    const screenWidthTracker = () => {
      setWidth(window.outerWidth);
    };
    window.addEventListener("resize", screenWidthTracker);
    return () => {
      window.removeEventListener("resize", screenWidthTracker);
    };
  }, []);

  return (
    <header className={styles["header-container"]}>
      <nav className={styles["header-first-child"]}>
        <section className={styles["header-content-container"]}>
          <article className={styles["dashboard-logo"]}>
            <NavLink
              to="/dashboard"
              onClick={(e) => {
                dispatch(isDashboard(true));
              }}
            >
              <HiOutlineSortDescending />
            </NavLink>
            <img src={seekFint} alt="" />
          </article>
          <article className={styles["create-search-sms"]}>
            <MdAddCircleOutline />
            <FiSearch />
            <RiMessengerLine />
          </article>
        </section>
        <section></section>
      </nav>
    </header>
  );
};
