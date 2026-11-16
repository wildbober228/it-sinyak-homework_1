export type SearchStatus =
  | "idle"
  | "loading"
  | "updating"
  | "success"
  | "error";

export type RequestStatus = "loading" | "updating";

export type RequestError = {
  code: "rateLimit" | "server" | "network";
  status: number | null;
};

export type TaskResult = {
  error: unknown;
};

export type Show = {
  id: number;
  name: string;
  url: string;
  image: string | null;
  genres: string[];
  year: string | null;
  rating: string | null;
  network: string | null;
  summary: string;
};

type Genre = {
  name: string;
  count: number;
};

export type ShowsQuery = {
  query: string;
  genre: string | null;
  page: number;
};

export type ShowsResult = {
  items: Show[];
  genres: Genre[];
  total: number;
  found: number;
  page: number;
  pageCount: number;
};

export type FavoritesList = {
  items: Show[];
};

export type FavoritesStatus = "idle" | "loading" | "ready" | "error";

export type ServerStatus = "idle" | "connecting" | "waking" | "ready" | "down";

export type ToastMessage =
  | { kind: "added" | "removed"; title: string }
  | { kind: "removedMany"; count: number }
  | { kind: "failed" };

export type ToastEntry = ToastMessage & {
  id: number;
};
