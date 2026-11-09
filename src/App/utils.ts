import { SEARCH_URL } from "./constants";
import type { ApiSearchResult, ApiShow, Show } from "./types";

class HttpError extends Error {
  status: number;

  constructor(status: number) {
    super(`HTTP ${status}`);
    this.status = status;
  }
}

export async function fetchShows(
  query: string,
  signal: AbortSignal,
): Promise<Show[]> {
  const url = `${SEARCH_URL}?q=${encodeURIComponent(query)}`;
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new HttpError(response.status);
  }

  const results: ApiSearchResult[] = await response.json();

  return results.map(({ show }) => toShow(show));
}

export function getErrorMessage(error: unknown) {
  if (error instanceof HttpError && error.status === 429) {
    return "Слишком много запросов. Подождите пару секунд и попробуйте снова.";
  }

  if (error instanceof HttpError) {
    return `Сервер TVmaze ответил ошибкой ${error.status}.`;
  }

  return "Не удалось связаться с сервером. Проверьте подключение к интернету.";
}

function toShow(show: ApiShow): Show {
  return {
    id: show.id,
    name: show.name,
    url: show.url,
    image: show.image?.medium ?? null,
    genres: show.genres,
    year: show.premiered?.slice(0, 4) ?? null,
    rating: show.rating.average?.toFixed(1) ?? null,
    network: show.network?.name ?? show.webChannel?.name ?? null,
    summary: stripHtml(show.summary ?? ""),
  };
}

function stripHtml(html: string) {
  const document = new DOMParser().parseFromString(html, "text/html");

  return document.body.textContent?.trim() ?? "";
}
