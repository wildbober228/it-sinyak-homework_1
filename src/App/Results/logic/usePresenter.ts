import { useTranslation } from "react-i18next";

import { searchStore } from "~/App/logic/searchStore";

import { retrySearch } from "./tasks/retrySearch";

export function usePresenter() {
  const { t } = useTranslation();
  const { status, shows, filteredShows, genre, error } = searchStore;
  const isSuccess = status === "success";
  const total = shows.length;

  return {
    label: t("results.label"),
    isLoading: status === "loading",
    isError: status === "error",
    isEmpty: isSuccess && total === 0,
    hasResults: isSuccess && total > 0,
    summary: genre
      ? t("results.genreSummary", {
          genre: t(genre, { ns: "genres" }),
          found: filteredShows.length,
          total,
        })
      : t("results.summary", { count: total }),
    errorMessage: error
      ? t(`errors.${error.code}`, { status: error.status })
      : "",
    retry: retrySearch,
  };
}
