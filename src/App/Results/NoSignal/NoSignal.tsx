import { observer } from "mobx-react-lite";

import { Button } from "~/components/Button/Button";

import type { NoSignalProps } from "./logic/usePresenter";
import { usePresenter } from "./logic/usePresenter";

import styles from "./NoSignal.module.css";

export const NoSignal = observer(function NoSignal(props: NoSignalProps) {
  const { title, message, retryLabel, retry } = usePresenter(props);

  return (
    <div className={styles.tv}>
      <div className={styles.screen} role="alert">
        <span className={styles.channel} aria-hidden="true">
          AV-1
        </span>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{message}</p>
        <Button onClick={retry}>
          <span aria-hidden="true">◀◀</span> {retryLabel}
        </Button>
      </div>
    </div>
  );
});
