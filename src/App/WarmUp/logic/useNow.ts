import { useEffect, useState } from "react";

export function useNow(isTicking: boolean) {
  const [now, setNow] = useState(Date.now);

  useEffect(() => {
    if (!isTicking) return;

    const tick = () => setNow(Date.now());
    const timer = setInterval(tick, 1000);

    tick();

    return () => clearInterval(timer);
  }, [isTicking]);

  return now;
}
