import { useState } from "react";

export function useMarkedIds() {
  const [ids, setIds] = useState<ReadonlySet<number>>(() => new Set());

  const toggle = (id: number) =>
    setIds((current) => {
      const next = new Set(current);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });

  const clear = () => setIds(new Set());

  return { ids, toggle, clear };
}
