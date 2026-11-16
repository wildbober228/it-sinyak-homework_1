import { searchStore } from "~/App/logic/searchStore";
import { loadShows } from "~/App/logic/tasks/loadShows";

export async function searchShows(query: string) {
  const { searchedQuery, status } = searchStore;

  if (query === searchedQuery && status !== "error") return { error: null };

  searchStore.setSearchedQuery(query);
  searchStore.setGenre(null);
  searchStore.setPage(1);

  return loadShows("loading");
}
