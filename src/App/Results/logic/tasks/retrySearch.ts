import { loadShows } from "~/App/logic/tasks/loadShows";

export function retrySearch() {
  return loadShows("loading");
}
