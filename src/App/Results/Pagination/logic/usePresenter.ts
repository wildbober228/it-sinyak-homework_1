import { searchStore } from "~/App/logic/searchStore";

import { goToPage } from "./tasks/goToPage";

export function usePresenter() {
  const { page, pageCount } = searchStore;

  const pages = Array.from({ length: pageCount }, (_, index) => {
    const number = index + 1;

    return {
      number,
      isCurrent: number === page,
      ariaCurrent: number === page ? ("page" as const) : undefined,
      onSelect: () => goToPage(number),
    };
  });

  return {
    isVisible: pageCount > 1,
    pages,
    isFirst: page === 1,
    isLast: page === pageCount,
    goPrev: () => goToPage(page - 1),
    goNext: () => goToPage(page + 1),
  };
}
