import { observer } from "mobx-react-lite";

import styles from "./Cover.module.css";

type CoverProps = {
  title: string;
  image: string | null;
  hitLabel: string | null;
};

export const Cover = observer(function Cover(props: CoverProps) {
  return (
    <span className={styles.cover}>
      <span className={styles.band}>
        <span>VHS</span>
        <span>PAL · Hi-Fi</span>
      </span>
      {props.image ? (
        <img className={styles.poster} src={props.image} alt="" />
      ) : (
        <span className={styles.noPoster} aria-hidden="true">
          📼
        </span>
      )}
      <span className={styles.caption}>{props.title}</span>
      {props.hitLabel && <span className={styles.hit}>{props.hitLabel}</span>}
    </span>
  );
});
