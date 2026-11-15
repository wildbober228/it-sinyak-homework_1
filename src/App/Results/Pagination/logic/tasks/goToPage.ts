import { searchStore } from "~/App/logic/searchStore";

export function goToPage(page: number) {
  const { pageCount } = searchStore;

  searchStore.setPage(Math.min(Math.max(page, 1), pageCount));
}
