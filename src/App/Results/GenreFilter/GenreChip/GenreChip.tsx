import { observer } from "mobx-react-lite";

import styles from "./GenreChip.module.css";

type GenreChipProps = {
  label: string;
  count: number;
  isActive: boolean;
  onSelect: () => void;
};

export const GenreChip = observer(function GenreChip(props: GenreChipProps) {
  return (
    <button
      className={styles.plate}
      type="button"
      onClick={props.onSelect}
      aria-pressed={props.isActive}
    >
      {props.label}
      <span className={styles.count}>{props.count}</span>
    </button>
  );
});
