import type { ShowsResult } from "~/App/types";

export const API_URL = import.meta.env.VITE_API_URL;

export const CLIENT_ID_HEADER = "X-Client-Id";

export const CLIENT_ID_STORAGE_KEY = "videoprokat:clientId:v1";

export const EMPTY_RESULT: ShowsResult = {
  items: [],
  genres: [],
  total: 0,
  found: 0,
  page: 1,
  pageCount: 0,
};

export const WAKE_HINT_DELAY_MS = 1500;

export const WAKE_TIMEOUT_MS = 90_000;

export const PING_RETRY_DELAY_MS = 3000;

export const HEARTBEAT_INTERVAL_MS = 10 * 60_000;

export const MAX_TOASTS = 3;
