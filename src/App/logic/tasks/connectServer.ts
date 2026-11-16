import { WAKE_HINT_DELAY_MS, WAKE_TIMEOUT_MS } from "~/App/constants";
import { waitForServer } from "~/App/logic/api";
import { serverStore } from "~/App/logic/serverStore";
import type { TaskResult } from "~/App/types";

export function connectServer(): Promise<TaskResult> {
  if (serverStore.connection) return serverStore.connection;

  const hint = setTimeout(
    () => serverStore.setStatus("waking"),
    WAKE_HINT_DELAY_MS,
  );

  const connection = waitForServer(WAKE_TIMEOUT_MS)
    .then(
      () => {
        serverStore.setStatus("ready");

        return { error: null };
      },
      (error: unknown) => {
        serverStore.disconnect();

        return { error };
      },
    )
    .finally(() => clearTimeout(hint));

  return serverStore.connect(connection);
}
