import { observer } from "mobx-react-lite";

import { FavoritesMenu } from "./FavoritesMenu/FavoritesMenu";
import { usePresenter } from "./logic/usePresenter";

import styles from "./Favorites.module.css";

export const Favorites = observer(function Favorites() {
  const { rootRef, isOpen, label, count, toggle, markedIds, toggleMark } =
    usePresenter();

  return (
    <div ref={rootRef}>
      <button
        className={styles.toggle}
        type="button"
        aria-label={label}
        title={label}
        aria-expanded={isOpen}
        onClick={toggle}
      >
        <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
          <path d="m12 2.5 2.9 5.9 6.6 1-4.8 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.5 9.4l6.6-1z" />
        </svg>
        <span className={styles.count}>{count}</span>
      </button>
      {isOpen && (
        <FavoritesMenu markedIds={markedIds} onToggleMark={toggleMark} />
      )}
    </div>
  );
});
