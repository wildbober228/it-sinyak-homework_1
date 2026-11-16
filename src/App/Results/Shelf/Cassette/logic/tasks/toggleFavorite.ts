import { deleteFavorites } from "~/App/logic/api";
import { favoritesStore } from "~/App/logic/favoritesStore";
import { toastStore } from "~/App/logic/toastStore";
import { putFavorite } from "~/App/Results/Shelf/Cassette/logic/api";
import type { Show } from "~/App/types";

export async function toggleFavorite(show: Show) {
  if (favoritesStore.pendingIds.has(show.id)) return { error: null };

  const isFavorite = favoritesStore.ids.has(show.id);

  favoritesStore.startPending(show.id);

  try {
    const { items } = isFavorite
      ? await deleteFavorites([show.id])
      : await putFavorite(show.id);

    favoritesStore.setShows(items);
    toastStore.push({
      kind: isFavorite ? "removed" : "added",
      title: show.name,
    });

    return { error: null };
  } catch (error) {
    toastStore.push({ kind: "failed" });

    return { error };
  } finally {
    favoritesStore.endPending(show.id);
  }
}
