import { makeAutoObservable } from "mobx";

import { PAGE_SIZE } from "~/App/constants";
import type { Genre, SearchStatus, Show } from "~/App/types";

class SearchStore {
  query = "";
  searchedQuery = "";
  shows: Show[] = [];
  status: SearchStatus = "idle";
  errorMessage = "";
  genre: string | null = null;
  page = 1;

  private controller: AbortController | null = null;

  constructor() {
    makeAutoObservable<this, "controller">(this, { controller: false });
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

  setGenre(genre: string | null) {
    this.genre = genre;
  }

  setPage(page: number) {
    this.page = page;
  }

  startRequest(query: string) {
    this.controller?.abort();
    this.controller = new AbortController();
    this.searchedQuery = query;
    this.status = "loading";

    return this.controller.signal;
  }

  setShows(shows: Show[]) {
    this.shows = shows;
    this.status = "success";
  }

  setError(message: string) {
    this.status = "error";
    this.errorMessage = message;
  }

  reset() {
    this.controller?.abort();
    this.searchedQuery = "";
    this.shows = [];
    this.status = "idle";
    this.errorMessage = "";
    this.genre = null;
    this.page = 1;
  }
}

export const searchStore = new SearchStore();
