import { useTranslation } from "react-i18next";

export type NoSignalProps = {
  message: string;
  onRetry: () => void;
};

export function usePresenter({ message, onRetry }: NoSignalProps) {
  const { t } = useTranslation();

  return {
    title: t("noSignal.title"),
    message,
    retryLabel: t("noSignal.retry"),
    retry: onRetry,
  };
}
