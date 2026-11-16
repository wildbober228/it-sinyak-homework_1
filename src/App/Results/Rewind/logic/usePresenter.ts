import { useTranslation } from "react-i18next";

import { PAGE_SIZE } from "~/App/constants";

const placeholders = Array.from({ length: PAGE_SIZE }, (_, index) => index);

export function usePresenter() {
  const { t } = useTranslation();

  return {
    status: t("rewind.status"),
    placeholders,
  };
}
