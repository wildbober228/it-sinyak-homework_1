import { useTranslation } from "react-i18next";

import { serverStore } from "~/App/logic/serverStore";
import { startSession } from "~/App/logic/tasks/startSession";

import { useNow } from "./useNow";
import { formatElapsed } from "./utils";

export function usePresenter() {
  const { t } = useTranslation();
  const { status, connectingSince } = serverStore;
  const isWaking = status === "waking";
  const isDown = status === "down";
  const now = useNow(isWaking);

  return {
    isVisible: isWaking || isDown,
    isDown,
    title: isDown ? t("warmUp.downTitle") : t("warmUp.title"),
    text: isDown ? t("warmUp.downText") : t("warmUp.text"),
    elapsed: isWaking ? formatElapsed(now - connectingSince) : null,
    retryLabel: t("warmUp.retry"),
    retry: startSession,
  };
}
