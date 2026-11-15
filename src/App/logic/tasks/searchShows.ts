import { fetchShows, getErrorMessage } from "~/App/logic/api";
import { searchStore } from "~/App/logic/searchStore";

import { selectGenre } from "./selectGenre";

export async function searchShows(query: string) {
  const { searchedQuery, status } = searchStore;

  if (query === searchedQuery && status !== "error") return { error: null };

  const signal = searchStore.startRequest(query);

  try {
    searchStore.setShows(await fetchShows(query, signal));
    selectGenre(null);

    return { error: null };
  } catch (error) {
    if (signal.aborted) return { error: null };

    searchStore.setError(getErrorMessage(error));

    return { error };
  }
}
