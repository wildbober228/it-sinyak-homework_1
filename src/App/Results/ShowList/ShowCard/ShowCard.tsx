import { observer } from "mobx-react-lite";

import type { Show } from "~/App/types";

import { ShowInfo } from "./ShowInfo/ShowInfo";

import styles from "./ShowCard.module.css";

type ShowCardProps = {
  show: Show;
};

export const ShowCard = observer(function ShowCard({ show }: ShowCardProps) {
  return (
    <li className={styles.card}>
      <a
        className={styles.link}
        href={show.url}
        target="_blank"
        rel="noreferrer"
      >
        {show.image ? (
          <img className={styles.poster} src={show.image} alt="" />
        ) : (
          <div className={styles.placeholder} aria-hidden="true">
            📺
          </div>
        )}
        <ShowInfo show={show} />
      </a>
    </li>
  );
});
