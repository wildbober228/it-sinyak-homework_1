import { useTranslation } from "react-i18next";

export function usePresenter() {
  const { t } = useTranslation();

  return {
    title: t("emptyShelf.title"),
    text: t("emptyShelf.text"),
  };
}
