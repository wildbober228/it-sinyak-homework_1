import { searchStore } from "~/App/logic/searchStore";

export function selectGenre(genre: string | null) {
  searchStore.setGenre(genre);
  searchStore.setPage(1);
}
