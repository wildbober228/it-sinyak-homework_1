import { searchStore } from "~/App/logic/searchStore";

import { retrySearch } from "./tasks/retrySearch";
import { pluralize } from "./utils";

export function usePresenter() {
  const { status, shows, filteredShows, genre, errorMessage } = searchStore;
  const isSuccess = status === "success";
  const total = shows.length;
  const found = filteredShows.length;

  return {
    isLoading: status === "loading",
    isError: status === "error",
    isEmpty: isSuccess && total === 0,
    hasResults: isSuccess && total > 0,
    summary: genre
      ? `${genre}: ${found} из ${total}`
      : `Найдено ${total} ${pluralize(total, "сериал", "сериала", "сериалов")}`,
    errorMessage,
    retry: retrySearch,
  };
}
