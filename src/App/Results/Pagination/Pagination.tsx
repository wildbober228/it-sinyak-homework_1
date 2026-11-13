import { observer } from "mobx-react-lite";

import { Button } from "~/components/Button/Button";

import { usePresenter } from "./usePresenter";

import styles from "./Pagination.module.css";

export const Pagination = observer(function Pagination() {
  const { isVisible, pages, isFirst, isLast, goPrev, goNext } = usePresenter();

  return (
    isVisible && (
      <nav className={styles.pagination} aria-label="Страницы результатов">
        <Button
          variant="secondary"
          shape="circle"
          onClick={goPrev}
          disabled={isFirst}
          aria-label="Предыдущая страница"
        >
          ←
        </Button>
        {pages.map((page) => (
          <Button
            key={page.number}
            variant="secondary"
            shape="circle"
            isActive={page.isCurrent}
            onClick={page.onSelect}
            aria-current={page.isCurrent && "page"}
          >
            {page.number}
          </Button>
        ))}
        <Button
          variant="secondary"
          shape="circle"
          onClick={goNext}
          disabled={isLast}
          aria-label="Следующая страница"
        >
          →
        </Button>
      </nav>
    )
  );
});
