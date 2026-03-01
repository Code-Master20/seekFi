import { useEffect } from "react";
import styles from "./HomeFeed.module.css";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export const HomeFeed = () => {
  const { user, successMessage, isAuthenticated, success, purpose } =
    useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && purpose) {
      toast.success(successMessage);
    }
  }, [isAuthenticated, successMessage, purpose]);

  return <main className={styles["main-container"]}>Home Sections</main>;
};
