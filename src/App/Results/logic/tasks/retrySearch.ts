import { searchStore } from "~/App/logic/searchStore";
import { searchShows } from "~/App/logic/tasks/searchShows";

export function retrySearch() {
  return searchShows(searchStore.searchedQuery);
}
