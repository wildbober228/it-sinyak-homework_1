import { observer } from "mobx-react-lite";

import type { RentalCardProps } from "./logic/usePresenter";
import { usePresenter } from "./logic/usePresenter";

import styles from "./RentalCard.module.css";

export const RentalCard = observer(function RentalCard(props: RentalCardProps) {
  const {
    labels,
    catalogNumber,
    title,
    year,
    network,
    genres,
    rating,
    summary,
    url,
  } = usePresenter(props);

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <span>{labels.heading}</span>
        <span className={styles.number}>{catalogNumber}</span>
      </header>
      <h3 className={styles.title}>{title}</h3>
      <dl className={styles.fields}>
        <dt>{labels.year}</dt>
        <dd>{year}</dd>
        <dt>{labels.network}</dt>
        <dd>{network}</dd>
        <dt>{labels.genres}</dt>
        <dd>{genres}</dd>
        <dt>{labels.rating}</dt>
        <dd>{rating}</dd>
      </dl>
      <p className={styles.summary}>{summary}</p>
      <a className={styles.link} href={url} target="_blank" rel="noreferrer">
        {labels.rent}
      </a>
    </article>
  );
});
