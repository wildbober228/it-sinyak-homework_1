import { searchStore } from "~/App/logic/searchStore";

export function changeQuery(value: string) {
  searchStore.setQuery(value);

  if (!value.trim()) searchStore.reset();
}
