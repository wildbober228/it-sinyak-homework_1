import { useState } from "react";

import { ShowsStore } from "./ShowsStore";

import styles from "./App.module.css";

export function usePresenter() {
  const [store] = useState(() => new ShowsStore());

  return {
    store,
    className:
      store.status === "idle" ? `${styles.app} ${styles.idle}` : styles.app,
  };
}
