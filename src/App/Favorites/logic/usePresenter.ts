import { useRef, useState } from "react";

import { useTranslation } from "react-i18next";

import { favoritesStore } from "~/App/logic/favoritesStore";

import { removeFavorites } from "./tasks/removeFavorites";
import { useDismiss } from "./useDismiss";
import { useMarkedIds } from "./useMarkedIds";

export function usePresenter() {
  const { t } = useTranslation();
  const rootRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const marked = useMarkedIds();
  const { status, count } = favoritesStore;
  const isReady = status === "ready";

  const close = () => {
    removeFavorites([...marked.ids]);
    marked.clear();
    setIsOpen(false);
  };

  useDismiss(rootRef, isOpen, close);

  return {
    rootRef,
    isOpen,
    label: isReady
      ? t("favorites.button", { count })
      : t("favorites.buttonLoading"),
    count: isReady ? String(count) : t("favorites.pending"),
    toggle: isOpen ? close : () => setIsOpen(true),
    markedIds: marked.ids,
    toggleMark: marked.toggle,
  };
}
