import { searchStore } from "~/App/logic/searchStore";
import { loadShows } from "~/App/logic/tasks/loadShows";

export async function goToPage(page: number) {
  if (page === searchStore.page) return { error: null };

  searchStore.setPage(page);

  return loadShows("updating");
}
