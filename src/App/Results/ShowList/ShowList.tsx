import { observer } from "mobx-react-lite";

import { ShowCard } from "./ShowCard/ShowCard";
import { usePresenter } from "./usePresenter";

import styles from "./ShowList.module.css";

export const ShowList = observer(function ShowList() {
  const { shows } = usePresenter();

  return (
    <ul className={styles.list}>
      {shows.map((show) => (
        <ShowCard key={show.id} show={show} />
      ))}
    </ul>
  );
});
