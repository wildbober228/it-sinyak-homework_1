import { deleteFavorites } from "~/App/logic/api";
import { favoritesStore } from "~/App/logic/favoritesStore";
import { toastStore } from "~/App/logic/toastStore";

export async function removeFavorites(ids: number[]) {
  if (ids.length === 0) return { error: null };

  const removed = favoritesStore.shows.filter((show) => ids.includes(show.id));

  try {
    const { items } = await deleteFavorites(ids);

    favoritesStore.setShows(items);
    toastStore.push(
      removed.length === 1
        ? { kind: "removed", title: removed[0].name }
        : { kind: "removedMany", count: ids.length },
    );

    return { error: null };
  } catch (error) {
    toastStore.push({ kind: "failed" });

    return { error };
  }
}
