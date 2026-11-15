import { searchStore } from "~/App/logic/searchStore";

export function usePresenter() {
  return {
    shows: searchStore.pageShows,
  };
}
