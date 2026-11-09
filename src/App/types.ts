export type SearchStatus = "idle" | "loading" | "success" | "error";

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

export type Genre = {
  name: string;
  count: number;
};

export type ApiShow = {
  id: number;
  name: string;
  url: string;
  genres: string[];
  premiered: string | null;
  rating: { average: number | null };
  network: { name: string } | null;
  webChannel: { name: string } | null;
  image: { medium: string; original: string } | null;
  summary: string | null;
};

export type ApiSearchResult = {
  score: number;
  show: ApiShow;
};
