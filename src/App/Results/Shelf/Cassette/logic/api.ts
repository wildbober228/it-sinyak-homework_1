import { favoritesRequest } from "~/App/logic/api";

export function putFavorite(id: number) {
  return favoritesRequest(`/api/favorites/${id}`, "PUT");
}
