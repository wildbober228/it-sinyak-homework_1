import { createContext } from "react";

import type { ShowsStore } from "./ShowsStore";

// Значение всегда задаёт Provider в App, дефолт никогда не читается.
export const ShowsStoreContext = createContext<ShowsStore>(
  null as unknown as ShowsStore,
);
