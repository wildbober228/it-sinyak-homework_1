import { useEffect } from "react";

import { HEARTBEAT_INTERVAL_MS } from "~/App/constants";

import { keepServerAwake } from "./tasks/keepServerAwake";
import { startSession } from "./tasks/startSession";

export function useSession() {
  useEffect(() => {
    startSession();

    const heartbeat = setInterval(keepServerAwake, HEARTBEAT_INTERVAL_MS);

    return () => clearInterval(heartbeat);
  }, []);
}
