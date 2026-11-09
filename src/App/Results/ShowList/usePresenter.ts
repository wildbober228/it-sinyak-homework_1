import { use } from "react";

import { ShowsStoreContext } from "../../ShowsStoreContext";

export function usePresenter() {
  const store = use(ShowsStoreContext);

  return {
    shows: store.pageShows,
  };
}
