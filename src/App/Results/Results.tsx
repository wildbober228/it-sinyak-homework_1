import { observer } from "mobx-react-lite";

import { EmptyShelf } from "./EmptyShelf/EmptyShelf";
import { GenreFilter } from "./GenreFilter/GenreFilter";
import { usePresenter } from "./logic/usePresenter";
import { NoSignal } from "./NoSignal/NoSignal";
import { Pagination } from "./Pagination/Pagination";
import { Rewind } from "./Rewind/Rewind";
import { Shelf } from "./Shelf/Shelf";

import styles from "./Results.module.css";

export const Results = observer(function Results() {
  const {
    label,
    isLoading,
    isError,
    isEmpty,
    hasResults,
    summary,
    errorMessage,
    retry,
  } = usePresenter();

  return (
    <section className={styles.results} aria-label={label}>
      {isLoading && <Rewind />}
      {isError && <NoSignal message={errorMessage} onRetry={retry} />}
      {isEmpty && <EmptyShelf />}
      {hasResults && (
        <>
          <GenreFilter />
          <p className={styles.summary} aria-live="polite">
            {summary}
          </p>
          <Shelf />
          <Pagination />
        </>
      )}
    </section>
  );
});
