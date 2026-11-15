import { searchStore } from "./searchStore";

import styles from "~/App/App.module.css";

export function usePresenter() {
  return {
    className:
      searchStore.status === "idle"
        ? `${styles.app} ${styles.idle}`
        : styles.app,
  };
}
