import { useTranslation } from "react-i18next";

import { favoritesStore } from "~/App/logic/favoritesStore";
import { HIT_RATING } from "~/App/Results/Shelf/Cassette/constants";
import { padCatalogNumber } from "~/App/Results/Shelf/logic/utils";
import type { Show } from "~/App/types";

import { toggleFavorite } from "./tasks/toggleFavorite";

import styles from "~/App/Results/Shelf/Cassette/Cassette.module.css";

export type CassetteProps = {
  show: Show;
  isPulledOut: boolean;
  onPullOut: () => void;
};

const tones = [
  styles.toneBlack,
  styles.toneRed,
  styles.toneBlue,
  styles.toneYellow,
  styles.toneWhite,
  styles.toneGreen,
  styles.tonePurple,
];

export function usePresenter({ show, isPulledOut, onPullOut }: CassetteProps) {
  const { t } = useTranslation();
  const isHit = Number(show.rating) >= HIT_RATING;
  const isFavorite = favoritesStore.ids.has(show.id);

  return {
    className: `${styles.cassette} ${tones[show.id % tones.length]}`,
    title: show.name,
    year: show.year,
    image: show.image,
    catalogNumber: t("shelf.catalogNumber", {
      number: padCatalogNumber(show.id),
    }),
    spineHitLabel: isHit ? t("shelf.spineHit") : null,
    coverHitLabel: isHit ? t("shelf.coverHit") : null,
    isPulledOut,
    pullOut: onPullOut,
    favorite: {
      isActive: isFavorite,
      isBusy: favoritesStore.pendingIds.has(show.id),
      label: isFavorite
        ? t("favorites.remove", { title: show.name })
        : t("favorites.add", { title: show.name }),
      toggle: () => toggleFavorite(show),
    },
  };
}
