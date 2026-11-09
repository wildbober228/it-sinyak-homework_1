import { observer } from "mobx-react-lite";

import { usePresenter } from "./usePresenter";

import styles from "./ShowsSkeleton.module.css";

export const ShowsSkeleton = observer(function ShowsSkeleton() {
  const { placeholders } = usePresenter();

  return (
    <ul className={styles.list} aria-busy="true" aria-label="Загрузка">
      {placeholders.map((placeholder) => (
        <li key={placeholder} className={styles.card}>
          <div className={styles.poster} />
          <div className={styles.lines}>
            <div className={styles.meta} />
            <div className={styles.title} />
            <div className={styles.text} />
            <div className={styles.textShort} />
          </div>
        </li>
      ))}
    </ul>
  );
});
