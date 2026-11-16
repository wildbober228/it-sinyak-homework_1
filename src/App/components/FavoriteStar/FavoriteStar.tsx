import { observer } from "mobx-react-lite";

import styles from "./FavoriteStar.module.css";

type FavoriteStarProps = {
  isActive: boolean;
  isBusy: boolean;
  label: string;
  onToggle: () => void;
};

export const FavoriteStar = observer(function FavoriteStar(
  props: FavoriteStarProps,
) {
  return (
    <button
      className={styles.star}
      type="button"
      aria-pressed={props.isActive}
      aria-busy={props.isBusy}
      aria-label={props.label}
      title={props.label}
      disabled={props.isBusy}
      onClick={props.onToggle}
    >
      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
        <path d="m12 2.5 2.9 5.9 6.6 1-4.8 4.6 1.1 6.5-5.8-3-5.8 3 1.1-6.5L2.5 9.4l6.6-1z" />
      </svg>
    </button>
  );
});
