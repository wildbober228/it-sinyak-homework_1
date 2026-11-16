import { useTranslation } from "react-i18next";

import { padCatalogNumber } from "~/App/Results/Shelf/logic/utils";
import type { Show } from "~/App/types";

export type RentalCardProps = {
  show: Show;
};

export function usePresenter({ show }: RentalCardProps) {
  const { t } = useTranslation();
  const missing = t("rentalCard.missing");
  const genres = show.genres.map((genre) => t(genre, { ns: "genres" }));

  return {
    labels: {
      heading: t("rentalCard.heading"),
      year: t("rentalCard.year"),
      network: t("rentalCard.network"),
      genres: t("rentalCard.genres"),
      rating: t("rentalCard.rating"),
      rent: t("rentalCard.rent"),
    },
    catalogNumber: t("shelf.catalogNumber", {
      number: padCatalogNumber(show.id),
    }),
    title: show.name,
    year: show.year ?? missing,
    network: show.network ?? missing,
    genres: genres.join(", ") || missing,
    rating: show.rating
      ? t("rentalCard.ratingValue", { rating: show.rating })
      : t("rentalCard.noRating"),
    summary: show.summary || t("rentalCard.noSummary"),
    url: show.url,
  };
}
