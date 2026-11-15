import { searchStore } from "~/App/logic/searchStore";
import { selectGenre } from "~/App/logic/tasks/selectGenre";

export function usePresenter() {
  const { genre, genres, shows } = searchStore;

  const toChip = (name: string | null, label: string, count: number) => ({
    key: name ?? "",
    label,
    count,
    isActive: genre === name,
    onSelect: () => selectGenre(name),
  });

  return {
    hasGenres: genres.length > 0,
    chips: [
      toChip(null, "Все", shows.length),
      ...genres.map(({ name, count }) => toChip(name, name, count)),
    ],
  };
}
