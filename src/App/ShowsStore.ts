import { makeAutoObservable, runInAction } from "mobx";

import { PAGE_SIZE } from "./constants";
import type { Genre, SearchStatus, Show } from "./types";
import { fetchShows, getErrorMessage } from "./utils";

export class ShowsStore {
  query = "";
  shows: Show[] = [];
  status: SearchStatus = "idle";
  errorMessage = "";
  genre: string | null = null;
  page = 1;

  private searchedQuery = "";
  private controller: AbortController | null = null;

  constructor() {
    makeAutoObservable<this, "controller">(
      this,
      { controller: false },
      { autoBind: true },
    );
  }

  get genres(): Genre[] {
    const counts = new Map<string, number>();

    for (const show of this.shows) {
      for (const genre of show.genres) {
        counts.set(genre, (counts.get(genre) ?? 0) + 1);
      }
    }

    return [...counts]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  get filteredShows() {
    const { genre } = this;

    return genre
      ? this.shows.filter((show) => show.genres.includes(genre))
      : this.shows;
  }

  get pageCount() {
    return Math.ceil(this.filteredShows.length / PAGE_SIZE);
  }

  get pageShows() {
    const start = (this.page - 1) * PAGE_SIZE;

    return this.filteredShows.slice(start, start + PAGE_SIZE);
  }

  setQuery(query: string) {
    this.query = query;
  }

  selectGenre(genre: string | null) {
    this.genre = genre;
    this.page = 1;
  }

  goToPage(page: number) {
    this.page = Math.min(Math.max(page, 1), this.pageCount);
  }

  reset() {
    this.controller?.abort();
    this.shows = [];
    this.status = "idle";
    this.errorMessage = "";
    this.searchedQuery = "";
    this.selectGenre(null);
  }

  retry() {
    this.search(this.searchedQuery);
  }

  async search(query: string) {
    if (query === this.searchedQuery && this.status !== "error") return;

    this.controller?.abort();
    const controller = new AbortController();
    this.controller = controller;
    this.searchedQuery = query;
    this.status = "loading";

    try {
      const shows = await fetchShows(query, controller.signal);

      runInAction(() => {
        this.shows = shows;
        this.status = "success";
        this.selectGenre(null);
      });
    } catch (error) {
      if (controller.signal.aborted) return;

      runInAction(() => {
        this.status = "error";
        this.errorMessage = getErrorMessage(error);
      });
    }
  }
}
