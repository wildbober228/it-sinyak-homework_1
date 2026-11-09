import { useState } from "react";

import { observer } from "mobx-react-lite";

import { CounterStore } from "./stores/CounterStore";

import styles from "./App.module.css";

export const App = observer(function App() {
  const [counter] = useState(() => new CounterStore());

  return (
    <main className={styles.app}>
      <h1 className={styles.title}>React 19 + MobX + TypeScript + Vite</h1>
      <div className={styles.counter}>
        <button
          type="button"
          className={styles.button}
          onClick={counter.decrement}
        >
          −
        </button>
        <span className={styles.value}>{counter.count}</span>
        <button
          type="button"
          className={styles.button}
          onClick={counter.increment}
        >
          +
        </button>
      </div>
    </main>
  );
});
