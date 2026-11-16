import { observer } from "mobx-react-lite";

import { Button } from "~/components/Button/Button";

import { usePresenter } from "./logic/usePresenter";

import styles from "./WarmUp.module.css";

export const WarmUp = observer(function WarmUp() {
  const { isVisible, isDown, title, text, elapsed, retryLabel, retry } =
    usePresenter();

  return (
    isVisible && (
      <div className={styles.warmUp} role="status">
        <p className={styles.osd}>
          <span className={styles.play} aria-hidden="true">
            ▶
          </span>
          <span>{title}</span>
          {elapsed && <span className={styles.timer}>{elapsed}</span>}
        </p>
        <p className={styles.text}>{text}</p>
        {isDown && <Button onClick={retry}>{retryLabel}</Button>}
      </div>
    )
  );
});
