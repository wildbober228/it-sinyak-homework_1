import { use } from "react";

import { ShowsStoreContext } from "../../ShowsStoreContext";

import styles from "./GenreFilter.module.css";

export function usePresenter() {
  const store = use(ShowsStoreContext);

  const toChip = (genre: string | null, label: string, count: number) => {
    const isActive = store.genre === genre;

    return {
      key: genre ?? "",
      label,
      count,
      isActive,
      className: isActive ? `${styles.chip} ${styles.active}` : styles.chip,
      onSelect: () => store.selectGenre(genre),
    };
  };

  return {
    hasGenres: store.genres.length > 0,
    chips: [
      toChip(null, "Все", store.shows.length),
      ...store.genres.map(({ name, count }) => toChip(name, name, count)),
    ],
  };
}
