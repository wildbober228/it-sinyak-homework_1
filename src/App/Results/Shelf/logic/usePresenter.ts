import { useState } from "react";

import { useTranslation } from "react-i18next";

import { searchStore } from "~/App/logic/searchStore";

import styles from "~/App/Results/Shelf/Shelf.module.css";

export function usePresenter() {
  const { t } = useTranslation();
  const { status, result } = searchStore;
  const shows = result.items;
  const isUpdating = status === "updating";
  const [pulledOutId, setPulledOutId] = useState<number | null>(null);
  const pulledOut = shows.find((show) => show.id === pulledOutId) ?? shows[0];

  return {
    className: isUpdating ? `${styles.shelf} ${styles.updating}` : styles.shelf,
    isUpdating,
    label: t("shelf.label"),
    cassettes: shows.map((show) => ({
      show,
      isPulledOut: show === pulledOut,
      pullOut: () => setPulledOutId(show.id),
    })),
    pulledOut,
  };
}
