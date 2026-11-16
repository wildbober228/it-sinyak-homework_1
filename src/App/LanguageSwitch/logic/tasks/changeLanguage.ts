import { i18n } from "~/logic/i18n";
import type { Language } from "~/types";

export function changeLanguage(language: Language) {
  i18n.changeLanguage(language);
}
