import { observer } from "mobx-react-lite";

import { usePresenter } from "./usePresenter";

import styles from "./SearchBar.module.css";

export const SearchBar = observer(function SearchBar() {
  const {
    inputRef,
    query,
    hasQuery,
    isLoading,
    handleChange,
    handleSubmit,
    handleClear,
    handleKeyDown,
  } = usePresenter();

  return (
    <search>
      <form className={styles.form} onSubmit={handleSubmit}>
        <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          ref={inputRef}
          className={styles.input}
          type="text"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="..."
          aria-label="Название сериала"
          autoComplete="off"
          spellCheck={false}
          enterKeyHint="search"
        />
        <div className={styles.actions}>
          {isLoading && (
            <span
              className={styles.spinner}
              role="status"
              aria-label="Загрузка"
            />
          )}
          {hasQuery && (
            <button
              className={styles.clear}
              type="button"
              onClick={handleClear}
              aria-label="Очистить поиск"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          )}
        </div>
      </form>
    </search>
  );
});
