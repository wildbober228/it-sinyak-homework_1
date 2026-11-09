import { use } from "react";

import { ShowsStoreContext } from "../../ShowsStoreContext";

import styles from "./Pagination.module.css";

export function usePresenter() {
  const store = use(ShowsStoreContext);
  const { page, pageCount, goToPage } = store;

  const pages = Array.from({ length: pageCount }, (_, index) => {
    const number = index + 1;
    const isCurrent = number === page;

    return {
      number,
      isCurrent,
      className: isCurrent
        ? `${styles.button} ${styles.current}`
        : styles.button,
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
