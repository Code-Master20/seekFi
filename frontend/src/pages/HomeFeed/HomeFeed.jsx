import styles from "./HomeFeed.module.css";
import { useDispatch, useSelector } from "react-redux";

export const HomeFeed = () => {
  const { user } = useSelector((state) => state.auth);

  return <main className={styles["main-container"]}>Home Sections</main>;
};
