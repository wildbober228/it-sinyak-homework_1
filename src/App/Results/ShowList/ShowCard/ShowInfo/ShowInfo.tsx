import { observer } from "mobx-react-lite";

import type { Show } from "~/App/types";

import styles from "./ShowInfo.module.css";

type ShowInfoProps = {
  show: Show;
};

export const ShowInfo = observer(function ShowInfo({ show }: ShowInfoProps) {
  return (
    <div className={styles.info}>
      <div className={styles.meta}>
        {show.year && <span>{show.year}</span>}
        {show.network && <span>{show.network}</span>}
      </div>
      <div className={styles.heading}>
        <h3 className={styles.title}>{show.name}</h3>
        {show.rating && <span className={styles.rating}>★ {show.rating}</span>}
      </div>
      <ul className={styles.genres}>
        {show.genres.map((genre) => (
          <li key={genre} className={styles.genre}>
            {genre}
          </li>
        ))}
      </ul>
      {show.summary && <p className={styles.summary}>{show.summary}</p>}
    </div>
  );
});
