import { useTranslation } from "react-i18next";

import type { ToastEntry } from "~/App/types";

export function useToastText(toast: ToastEntry) {
  const { t } = useTranslation();

  switch (toast.kind) {
    case "added":
      return t("toast.added", { title: toast.title });
    case "removed":
      return t("toast.removed", { title: toast.title });
    case "removedMany":
      return t("toast.removedMany", { count: toast.count });
    case "failed":
      return t("toast.failed");
  }
}
