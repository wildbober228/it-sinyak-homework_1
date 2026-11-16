import { observer } from "mobx-react-lite";

import { Rack } from "~/App/Results/components/Rack/Rack";

import { usePresenter } from "./logic/usePresenter";

import styles from "./EmptyShelf.module.css";

export const EmptyShelf = observer(function EmptyShelf() {
  const { title, text } = usePresenter();

  return (
    <Rack>
      <div className={styles.note} role="status">
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{text}</p>
      </div>
    </Rack>
  );
});
