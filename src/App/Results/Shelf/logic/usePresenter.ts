import { useState } from "react";

import { useTranslation } from "react-i18next";

import { searchStore } from "~/App/logic/searchStore";

export function usePresenter() {
  const { t } = useTranslation();
  const shows = searchStore.pageShows;
  const [pulledOutId, setPulledOutId] = useState<number | null>(null);
  const pulledOut = shows.find((show) => show.id === pulledOutId) ?? shows[0];

  return {
    label: t("shelf.label"),
    cassettes: shows.map((show) => ({
      show,
      isPulledOut: show === pulledOut,
      pullOut: () => setPulledOutId(show.id),
    })),
    pulledOut,
  };
}
