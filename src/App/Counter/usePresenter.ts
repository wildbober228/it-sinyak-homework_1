import { useState } from "react";

import { CounterStore } from "./CounterStore";

export function usePresenter() {
  const [store] = useState(() => new CounterStore());

  return {
    count: store.count,
    increment: store.increment,
    decrement: store.decrement,
  };
}
