import { useTranslation } from "react-i18next";

import { toastStore } from "~/App/logic/toastStore";

export function usePresenter() {
  const { t } = useTranslation();

  return {
    label: t("toast.label"),
    toasts: toastStore.toasts,
  };
}
