import { use } from "react";

import { ShowsStoreContext } from "~/App/ShowsStoreContext";

export function usePresenter() {
  const store = use(ShowsStoreContext);
  const { page, pageCount, goToPage } = store;

  const pages = Array.from({ length: pageCount }, (_, index) => {
    const number = index + 1;

    return {
      number,
      isCurrent: number === page,
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
