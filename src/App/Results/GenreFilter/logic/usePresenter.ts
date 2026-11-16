import { useTranslation } from "react-i18next";

import { searchStore } from "~/App/logic/searchStore";
import { selectGenre } from "~/App/logic/tasks/selectGenre";

export function usePresenter() {
  const { t, i18n } = useTranslation();
  const { genre, genres, shows } = searchStore;

  const toChip = (name: string | null, label: string, count: number) => ({
    key: name ?? "",
    label,
    count,
    isActive: genre === name,
    onSelect: () => selectGenre(name),
  });

  const genreChips = genres
    .map(({ name, count }) => toChip(name, t(name, { ns: "genres" }), count))
    .toSorted((a, b) => a.label.localeCompare(b.label, i18n.language));

  return {
    label: t("genreFilter.label"),
    hasGenres: genres.length > 0,
    chips: [toChip(null, t("genreFilter.all"), shows.length), ...genreChips],
  };
}
