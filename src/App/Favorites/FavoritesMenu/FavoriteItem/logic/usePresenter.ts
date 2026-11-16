import { useTranslation } from "react-i18next";

import type { Show } from "~/App/types";

import styles from "~/App/Favorites/FavoritesMenu/FavoriteItem/FavoriteItem.module.css";

export type FavoriteItemProps = {
  show: Show;
  isMarked: boolean;
  onToggle: () => void;
};

export function usePresenter({ show, isMarked, onToggle }: FavoriteItemProps) {
  const { t } = useTranslation();

  return {
    className: isMarked ? `${styles.item} ${styles.marked}` : styles.item,
    image: show.image,
    title: show.name,
    meta: [show.year, show.network].filter(Boolean).join(" · "),
    isActive: !isMarked,
    starLabel: isMarked
      ? t("favorites.restore", { title: show.name })
      : t("favorites.remove", { title: show.name }),
    toggle: onToggle,
  };
}
