import { use } from "react";

import { ShowsStoreContext } from "../ShowsStoreContext";
import { pluralize } from "./utils";

export function usePresenter() {
  const store = use(ShowsStoreContext);
  const isSuccess = store.status === "success";
  const total = store.shows.length;
  const found = store.filteredShows.length;

  return {
    isLoading: store.status === "loading",
    isError: store.status === "error",
    isEmpty: isSuccess && total === 0,
    hasResults: isSuccess && total > 0,
    summary: store.genre
      ? `${store.genre}: ${found} из ${total}`
      : `Найдено ${total} ${pluralize(total, "сериал", "сериала", "сериалов")}`,
    errorMessage: store.errorMessage,
    retry: store.retry,
  };
}
