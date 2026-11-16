import { useTranslation } from "react-i18next";

import { LANGUAGES } from "~/constants";

import { changeLanguage } from "./tasks/changeLanguage";

export function usePresenter() {
  const { t, i18n } = useTranslation();

  return {
    label: t("languageSwitch.label"),
    options: LANGUAGES.map((language) => ({
      code: language,
      short: language.toUpperCase(),
      name: t("language.name", { lng: language }),
      isActive: i18n.resolvedLanguage === language,
      onSelect: () => changeLanguage(language),
    })),
  };
}
