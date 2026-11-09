import { observer } from "mobx-react-lite";

import { usePresenter } from "./usePresenter";

import styles from "./GenreFilter.module.css";

export const GenreFilter = observer(function GenreFilter() {
  const { hasGenres, chips } = usePresenter();

  return (
    hasGenres && (
      <fieldset className={styles.filter} aria-label="Жанры">
        {chips.map((chip) => (
          <button
            key={chip.key}
            className={chip.className}
            type="button"
            onClick={chip.onSelect}
            aria-pressed={chip.isActive}
          >
            {chip.label}
            <span className={styles.count}>{chip.count}</span>
          </button>
        ))}
      </fieldset>
    )
  );
});
