import { observer } from "mobx-react-lite";

import { Button } from "../../components/Button/Button";
import { usePresenter } from "./usePresenter";

import styles from "./Counter.module.css";

export const Counter = observer(function Counter() {
  const { count, increment, decrement } = usePresenter();

  return (
    <div className={styles.counter}>
      <Button onClick={decrement}>−</Button>
      <span className={styles.value}>{count}</span>
      <Button onClick={increment}>+</Button>
    </div>
  );
});
