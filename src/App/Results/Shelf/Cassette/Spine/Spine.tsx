import { observer } from "mobx-react-lite";

import styles from "./Spine.module.css";

type SpineProps = {
  title: string;
  year: string | null;
  catalogNumber: string;
  hitLabel: string | null;
};

export const Spine = observer(function Spine(props: SpineProps) {
  return (
    <span className={styles.spine}>
      <span className={styles.brand}>VHS</span>
      {props.hitLabel && <span className={styles.hit}>{props.hitLabel}</span>}
      <span className={styles.title}>{props.title}</span>
      {props.year && <span className={styles.year}>{props.year}</span>}
      <span className={styles.label}>{props.catalogNumber}</span>
    </span>
  );
});
