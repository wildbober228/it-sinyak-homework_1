import { makeAutoObservable, observableRef } from "mobx";

import { EMPTY_RESULT } from "~/App/constants";
import type {
  RequestError,
  RequestStatus,
  SearchStatus,
  ShowsResult,
} from "~/App/types";

class SearchStore {
  query = "";
  searchedQuery = "";
  genre: string | null = null;
  page = 1;
  status: SearchStatus = "idle";
  error: RequestError | null = null;
  result: ShowsResult = EMPTY_RESULT;

  private controller: AbortController | null = null;

  constructor() {
    makeAutoObservable<this, "controller">(this, {
      controller: false,
      result: observableRef,
    });
  }

  setQuery(query: string) {
    this.query = query;
  }

  setSearchedQuery(query: string) {
    this.searchedQuery = query;
  }

  setGenre(genre: string | null) {
    this.genre = genre;
  }

  setPage(page: number) {
    this.page = page;
  }

  startRequest(status: RequestStatus) {
    this.controller?.abort();
    this.controller = new AbortController();
    this.status = status;

    return this.controller.signal;
  }

  setResult(result: ShowsResult) {
    this.result = result;
    this.page = result.page;
    this.status = "success";
  }

  setError(error: RequestError) {
    this.status = "error";
    this.error = error;
  }

  reset() {
    this.controller?.abort();
    this.searchedQuery = "";
    this.genre = null;
    this.page = 1;
    this.status = "idle";
    this.error = null;
    this.result = EMPTY_RESULT;
  }
}

export const searchStore = new SearchStore();
