import { observer } from "mobx-react-lite";

import { Button } from "~/ui-kit/Button/Button";

import { usePresenter } from "./logic/usePresenter";

import styles from "./Pagination.module.css";

export const Pagination = observer(function Pagination() {
  const {
    label,
    shelfLabel,
    prevLabel,
    nextLabel,
    isVisible,
    pages,
    isFirst,
    isLast,
    goPrev,
    goNext,
  } = usePresenter();

  return (
    isVisible && (
      <nav className={styles.pagination} aria-label={label}>
        <Button onClick={goPrev} disabled={isFirst} aria-label={prevLabel}>
          ◀◀
        </Button>
        <span className={styles.label}>{shelfLabel}</span>
        <span className={styles.pages}>
          {pages.map((page) => (
            <button
              key={page.number}
              className={styles.page}
              type="button"
              onClick={page.onSelect}
              aria-current={page.ariaCurrent}
            >
              {page.number}
            </button>
          ))}
        </span>
        <Button onClick={goNext} disabled={isLast} aria-label={nextLabel}>
          ▶▶
        </Button>
      </nav>
    )
  );
});
