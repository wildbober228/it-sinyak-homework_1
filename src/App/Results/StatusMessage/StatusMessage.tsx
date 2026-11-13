import { observer } from "mobx-react-lite";

import { Button } from "~/components/Button/Button";

import styles from "./StatusMessage.module.css";

type StatusMessageProps = {
  icon: string;
  title: string;
  text: string;
  actionLabel?: string;
  onAction?: () => void;
};

export const StatusMessage = observer(function StatusMessage(
  props: StatusMessageProps,
) {
  return (
    <div className={styles.message} role="status">
      <span className={styles.icon} aria-hidden="true">
        {props.icon}
      </span>
      <h2 className={styles.title}>{props.title}</h2>
      <p className={styles.text}>{props.text}</p>
      {props.onAction && (
        <Button onClick={props.onAction}>{props.actionLabel}</Button>
      )}
    </div>
  );
});
