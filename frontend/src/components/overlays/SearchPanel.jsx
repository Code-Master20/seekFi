import { useState } from "react";
import styles from "./SearchPanel.module.css";

export const SearchPanel = ({ className, onClose }) => {
  const [activeType, setActiveType] = useState("profile");
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", query, "Type:", activeType);

    // Later:
    // if (activeType === "profile") → search users
    // if (activeType === "video") → search posts with postType="video"
    // if (activeType === "image") → search posts with postType="image"
  };

  return (
    <section className={`${styles.searchOverlay} ${className}`}>
      <div className={styles.searchContainer}>
        <div className={styles.searchHeader}>
          <h3>Search</h3>
          <button onClick={onClose} className={styles.closeBtn}>
            ✕
          </button>
        </div>

        <div className={styles.searchOptions}>
          <button
            className={activeType === "profile" ? styles.active : ""}
            onClick={() => setActiveType("profile")}
          >
            Profiles
          </button>

          <button
            className={activeType === "video" ? styles.active : ""}
            onClick={() => setActiveType("video")}
          >
            Videos
          </button>

          <button
            className={activeType === "image" ? styles.active : ""}
            onClick={() => setActiveType("image")}
          >
            Image Posts
          </button>
        </div>

        <div className={styles.searchInputWrapper}>
          <input
            type="search"
            placeholder={`Search ${activeType}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className={styles.resultsPlaceholder}>
          Results will appear here
        </div>
      </div>
    </section>
  );
};
