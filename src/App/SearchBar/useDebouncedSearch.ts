import { useEffect, useState } from "react";

import debounce from "debounce";

import { SEARCH_DELAY_MS } from "./constants";

export function useDebouncedSearch(search: (query: string) => unknown) {
  const [debouncedSearch] = useState(() => debounce(search, SEARCH_DELAY_MS));

  useEffect(() => () => debouncedSearch.clear(), [debouncedSearch]);

  return debouncedSearch;
}
