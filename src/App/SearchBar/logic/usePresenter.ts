import type { ChangeEvent, FormEvent, KeyboardEvent } from "react";
import { useRef } from "react";

import { useTranslation } from "react-i18next";

import { searchStore } from "~/App/logic/searchStore";

import { changeQuery } from "./tasks/changeQuery";
import { searchShows } from "./tasks/searchShows";
import { useDebouncedSearch } from "./useDebouncedSearch";

export function usePresenter() {
  const { t } = useTranslation();
  const debouncedSearch = useDebouncedSearch(searchShows);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateQuery = (value: string) => {
    const query = value.trim();

    changeQuery(value);

    if (query) {
      debouncedSearch(query);
    } else {
      debouncedSearch.clear();
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    updateQuery(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    debouncedSearch.flush();
  };

  const handleClear = () => {
    updateQuery("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") handleClear();
  };

  return {
    inputRef,
    query: searchStore.query,
    hasQuery: searchStore.query.length > 0,
    isLoading:
      searchStore.status === "loading" || searchStore.status === "updating",
    inputLabel: t("searchBar.label"),
    placeholder: t("searchBar.placeholder"),
    loadingLabel: t("searchBar.loading"),
    clearLabel: t("searchBar.clear"),
    handleChange,
    handleSubmit,
    handleClear,
    handleKeyDown,
  };
}
