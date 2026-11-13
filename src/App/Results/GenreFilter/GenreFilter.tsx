import { observer } from "mobx-react-lite";

import { GenreChip } from "./GenreChip/GenreChip";
import { usePresenter } from "./usePresenter";

import styles from "./GenreFilter.module.css";

export const GenreFilter = observer(function GenreFilter() {
  const { hasGenres, chips } = usePresenter();

  return (
    hasGenres && (
      <fieldset className={styles.filter} aria-label="Жанры">
        {chips.map((chip) => (
          <GenreChip
            key={chip.key}
            label={chip.label}
            count={chip.count}
            isActive={chip.isActive}
            onSelect={chip.onSelect}
          />
        ))}
      </fieldset>
    )
  );
});
