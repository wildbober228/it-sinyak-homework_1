import { use } from "react";

import { ShowsStoreContext } from "~/App/ShowsStoreContext";

export function usePresenter() {
  const store = use(ShowsStoreContext);

  const toChip = (genre: string | null, label: string, count: number) => ({
    key: genre ?? "",
    label,
    count,
    isActive: store.genre === genre,
    onSelect: () => store.selectGenre(genre),
  });

  return {
    hasGenres: store.genres.length > 0,
    chips: [
      toChip(null, "Все", store.shows.length),
      ...store.genres.map(({ name, count }) => toChip(name, name, count)),
    ],
  };
}
