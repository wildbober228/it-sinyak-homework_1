import { useTranslation } from "react-i18next";

import { serverStore } from "~/App/logic/serverStore";
import { PLACEHOLDER_COUNT } from "~/App/Results/Rewind/constants";

const placeholders = Array.from(
  { length: PLACEHOLDER_COUNT },
  (_, index) => index,
);

export function usePresenter() {
  const { t } = useTranslation();

  return {
    status:
      serverStore.status === "waking"
        ? t("rewind.warmingUp")
        : t("rewind.status"),
    placeholders,
  };
}
