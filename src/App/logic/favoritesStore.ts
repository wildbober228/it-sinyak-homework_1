import { makeAutoObservable, observableRef } from "mobx";

import type { FavoritesStatus, Show } from "~/App/types";

class FavoritesStore {
  shows: Show[] = [];
  status: FavoritesStatus = "idle";
  pendingIds = new Set<number>();

  constructor() {
    makeAutoObservable(this, { shows: observableRef });
  }

  get ids() {
    return new Set(this.shows.map((show) => show.id));
  }

  get count() {
    return this.shows.length;
  }

  setShows(shows: Show[]) {
    this.shows = shows;
    this.status = "ready";
  }

  setStatus(status: FavoritesStatus) {
    this.status = status;
  }

  startPending(id: number) {
    this.pendingIds.add(id);
  }

  endPending(id: number) {
    this.pendingIds.delete(id);
  }
}

export const favoritesStore = new FavoritesStore();
