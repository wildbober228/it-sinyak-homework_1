import {
  API_URL,
  CLIENT_ID_HEADER,
  CLIENT_ID_STORAGE_KEY,
  PING_RETRY_DELAY_MS,
} from "~/App/constants";
import type {
  FavoritesList,
  RequestError,
  ShowsQuery,
  ShowsResult,
} from "~/App/types";

class HttpError extends Error {
  status: number;

  constructor(status: number) {
    super(`HTTP ${status}`);
    this.status = status;
  }
}

const clientId = readClientId();

export function fetchShows(
  { query, genre, page }: ShowsQuery,
  signal: AbortSignal,
) {
  const params = new URLSearchParams({ q: query, page: String(page) });

  if (genre) params.set("genre", genre);

  return request<ShowsResult>(`/api/shows?${params}`, { signal });
}

export function favoritesRequest(path: string, method = "GET") {
  return request<FavoritesList>(path, {
    method,
    headers: { [CLIENT_ID_HEADER]: clientId },
  });
}

export function fetchFavorites() {
  return favoritesRequest("/api/favorites");
}

export function deleteFavorites(ids: number[]) {
  return favoritesRequest(`/api/favorites?ids=${ids.join(",")}`, "DELETE");
}

export function pingServer(signal?: AbortSignal) {
  return request<unknown>("/api/health", { signal });
}

export async function waitForServer(timeout: number) {
  const deadline = Date.now() + timeout;

  for (;;) {
    try {
      const remaining = Math.max(deadline - Date.now(), 1);

      return await pingServer(AbortSignal.timeout(remaining));
    } catch (error) {
      if (Date.now() + PING_RETRY_DELAY_MS >= deadline) throw error;

      await new Promise((resolve) => setTimeout(resolve, PING_RETRY_DELAY_MS));
    }
  }
}

export function toRequestError(error: unknown): RequestError {
  if (error instanceof HttpError) {
    return {
      code: error.status === 429 ? "rateLimit" : "server",
      status: error.status,
    };
  }

  return { code: "network", status: null };
}

async function request<T>(path: string, init: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, init);

  if (!response.ok) {
    throw new HttpError(response.status);
  }

  return response.json();
}

function readClientId() {
  try {
    const saved = localStorage.getItem(CLIENT_ID_STORAGE_KEY);

    if (saved) return saved;

    const created = createClientId();
    localStorage.setItem(CLIENT_ID_STORAGE_KEY, created);

    return created;
  } catch {
    return createClientId();
  }
}

function createClientId() {
  const bytes = crypto.getRandomValues(new Uint8Array(16));

  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}
