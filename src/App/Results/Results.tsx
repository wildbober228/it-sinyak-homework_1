import { observer } from "mobx-react-lite";

import { GenreFilter } from "./GenreFilter/GenreFilter";
import { Pagination } from "./Pagination/Pagination";
import { ShowList } from "./ShowList/ShowList";
import { ShowsSkeleton } from "./ShowsSkeleton/ShowsSkeleton";
import { StatusMessage } from "./StatusMessage/StatusMessage";
import { usePresenter } from "./usePresenter";

import styles from "./Results.module.css";

export const Results = observer(function Results() {
  const {
    isLoading,
    isError,
    isEmpty,
    hasResults,
    summary,
    errorMessage,
    retry,
  } = usePresenter();

  return (
    <section className={styles.results} aria-label="Результаты поиска">
      {isLoading && <ShowsSkeleton />}
      {isError && (
        <StatusMessage
          icon="⚠️"
          title="Не удалось загрузить сериалы"
          text={errorMessage}
          actionLabel="Попробовать снова"
          onAction={retry}
        />
      )}
      {isEmpty && (
        <StatusMessage
          icon="🔭"
          title="Ничего не нашлось"
          text="Попробуйте другое название — API лучше всего ищет на английском."
        />
      )}
      {hasResults && (
        <>
          <GenreFilter />
          <p className={styles.summary} aria-live="polite">
            {summary}
          </p>
          <ShowList />
          <Pagination />
        </>
      )}
    </section>
  );
});
