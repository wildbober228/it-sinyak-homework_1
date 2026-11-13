import { observer } from "mobx-react-lite";

import { Button } from "~/components/Button/Button";

import styles from "./GenreChip.module.css";

type GenreChipProps = {
  label: string;
  count: number;
  isActive: boolean;
  onSelect: () => void;
};

export const GenreChip = observer(function GenreChip(props: GenreChipProps) {
  return (
    <Button
      variant="secondary"
      size="sm"
      isActive={props.isActive}
      onClick={props.onSelect}
      aria-pressed={props.isActive}
    >
      {props.label}
      <span className={styles.count}>{props.count}</span>
    </Button>
  );
});
