import { searchStore } from "~/App/logic/searchStore";
import { loadShows } from "~/App/logic/tasks/loadShows";

export async function selectGenre(genre: string | null) {
  if (genre === searchStore.genre) return { error: null };

  searchStore.setGenre(genre);
  searchStore.setPage(1);

  return loadShows("updating");
}
