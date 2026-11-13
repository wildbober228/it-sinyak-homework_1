import type { ChangeEvent, FormEvent, KeyboardEvent } from "react";
import { use, useRef } from "react";

import { ShowsStoreContext } from "~/App/ShowsStoreContext";

import { useDebouncedSearch } from "./useDebouncedSearch";

export function usePresenter() {
  const store = use(ShowsStoreContext);
  const debouncedSearch = useDebouncedSearch(store.search);
  const inputRef = useRef<HTMLInputElement>(null);

  const cancelSearch = () => {
    debouncedSearch.clear();
    store.reset();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const query = value.trim();

    store.setQuery(value);

    if (query) {
      debouncedSearch(query);
    } else {
      cancelSearch();
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    debouncedSearch.flush();
  };

  const handleClear = () => {
    store.setQuery("");
    cancelSearch();
    inputRef.current?.focus();
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") handleClear();
  };

  return {
    inputRef,
    query: store.query,
    hasQuery: store.query.length > 0,
    isLoading: store.status === "loading",
    handleChange,
    handleSubmit,
    handleClear,
    handleKeyDown,
  };
}
