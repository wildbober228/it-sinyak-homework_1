import { observer } from "mobx-react-lite";

import { usePresenter } from "./usePresenter";

import styles from "./Pagination.module.css";

export const Pagination = observer(function Pagination() {
  const { isVisible, pages, isFirst, isLast, goPrev, goNext } = usePresenter();

  return (
    isVisible && (
      <nav className={styles.pagination} aria-label="Страницы результатов">
        <button
          className={styles.button}
          type="button"
          onClick={goPrev}
          disabled={isFirst}
          aria-label="Предыдущая страница"
        >
          ←
        </button>
        {pages.map((page) => (
          <button
            key={page.number}
            className={page.className}
            type="button"
            onClick={page.onSelect}
            aria-current={page.isCurrent && "page"}
          >
            {page.number}
          </button>
        ))}
        <button
          className={styles.button}
          type="button"
          onClick={goNext}
          disabled={isLast}
          aria-label="Следующая страница"
        >
          →
        </button>
      </nav>
    )
  );
});
