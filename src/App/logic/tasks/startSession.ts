import { fetchFavorites } from "~/App/logic/api";
import { favoritesStore } from "~/App/logic/favoritesStore";

import { connectServer } from "./connectServer";

export async function startSession() {
  favoritesStore.setStatus("loading");

  const connection = await connectServer();

  if (connection.error) {
    favoritesStore.setStatus("error");

    return connection;
  }

  try {
    const { items } = await fetchFavorites();
    favoritesStore.setShows(items);

    return { error: null };
  } catch (error) {
    favoritesStore.setStatus("error");

    return { error };
  }
}
