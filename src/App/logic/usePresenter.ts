import { useTranslation } from "react-i18next";

import { searchStore } from "./searchStore";
import { useSession } from "./useSession";

import styles from "~/App/App.module.css";

export function usePresenter() {
  const { t } = useTranslation();

  useSession();

  return {
    className:
      searchStore.status === "idle"
        ? `${styles.app} ${styles.idle}`
        : styles.app,
    eyebrow: t("app.eyebrow"),
    sign: t("app.sign"),
    tagline: t("app.tagline"),
    taglineAccent: t("app.taglineAccent"),
  };
}
