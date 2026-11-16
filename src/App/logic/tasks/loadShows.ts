import { fetchShows, toRequestError } from "~/App/logic/api";
import { searchStore } from "~/App/logic/searchStore";
import type { RequestStatus, TaskResult } from "~/App/types";

import { connectServer } from "./connectServer";

export async function loadShows(status: RequestStatus): Promise<TaskResult> {
  const { searchedQuery: query, genre, page } = searchStore;
  const signal = searchStore.startRequest(status);
  const connection = await connectServer();

  if (signal.aborted) return { error: null };

  if (connection.error) {
    searchStore.setError(toRequestError(connection.error));

    return connection;
  }

  try {
    searchStore.setResult(await fetchShows({ query, genre, page }, signal));

    return { error: null };
  } catch (error) {
    if (signal.aborted) return { error: null };

    searchStore.setError(toRequestError(error));

    return { error };
  }
}
