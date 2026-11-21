import { useTranslation } from "react-i18next";

import { searchStore } from "~/App/logic/searchStore";
import { loadShows } from "~/App/logic/tasks/loadShows";

export function usePresenter() {
  const { t } = useTranslation();
  const { status, genre, error, result } = searchStore;
  const { total, found } = result;
  const hasData = status === "success" || status === "updating";

  return {
    label: t("results.label"),
    isLoading: status === "loading",
    isError: status === "error",
    isEmpty: hasData && total === 0,
    hasResults: hasData && total > 0,
    summary: genre
      ? t("results.genreSummary", {
          genre: t(genre, { ns: "genres" }),
          found,
          total,
        })
      : t("results.summary", { count: total }),
    errorMessage: error
      ? t(`errors.${error.code}`, { status: error.status })
      : "",
    retry: () => loadShows("loading"),
  };
}
