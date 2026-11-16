import { useTranslation } from "react-i18next";

import { favoritesStore } from "~/App/logic/favoritesStore";

export type FavoritesMenuProps = {
  markedIds: ReadonlySet<number>;
  onToggleMark: (id: number) => void;
};

export function usePresenter({ markedIds, onToggleMark }: FavoritesMenuProps) {
  const { t } = useTranslation();
  const { shows, status } = favoritesStore;

  const notes = {
    idle: t("favorites.loading"),
    loading: t("favorites.loading"),
    error: t("favorites.error"),
    ready: shows.length === 0 ? t("favorites.empty") : null,
  };

  return {
    title: t("favorites.title"),
    note: notes[status],
    hasItems: shows.length > 0,
    items: shows.map((show) => ({
      show,
      isMarked: markedIds.has(show.id),
      toggle: () => onToggleMark(show.id),
    })),
  };
}
