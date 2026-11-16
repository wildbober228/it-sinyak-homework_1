import { pingServer } from "~/App/logic/api";
import { serverStore } from "~/App/logic/serverStore";

export async function keepServerAwake() {
  if (serverStore.status !== "ready") return { error: null };

  try {
    await pingServer();

    return { error: null };
  } catch (error) {
    return { error };
  }
}
