import { observer } from "mobx-react-lite";

import { usePresenter } from "./logic/usePresenter";
import { Toast } from "./Toast/Toast";

import styles from "./Toaster.module.css";

export const Toaster = observer(function Toaster() {
  const { label, toasts } = usePresenter();

  return (
    <ol className={styles.toaster} aria-label={label} aria-live="polite">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </ol>
  );
});
