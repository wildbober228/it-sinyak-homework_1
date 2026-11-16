import { useEffect } from "react";

import { TOAST_DURATION_MS } from "~/App/Toaster/Toast/constants";
import type { ToastEntry } from "~/App/types";

import { dismissToast } from "./tasks/dismissToast";
import { useToastText } from "./useToastText";

import styles from "~/App/Toaster/Toast/Toast.module.css";

export type ToastProps = {
  toast: ToastEntry;
};

export function usePresenter({ toast }: ToastProps) {
  const text = useToastText(toast);

  useEffect(() => {
    const timer = setTimeout(() => dismissToast(toast.id), TOAST_DURATION_MS);

    return () => clearTimeout(timer);
  }, [toast.id]);

  return {
    className:
      toast.kind === "failed"
        ? `${styles.toast} ${styles.failed}`
        : styles.toast,
    text,
  };
}
