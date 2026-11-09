import { observer } from "mobx-react-lite";

import { Counter } from "./Counter/Counter";

import styles from "./App.module.css";

export const App = observer(function App() {
  return (
    <main className={styles.app}>
      <h1 className={styles.title}>React 19 + MobX + TypeScript + Vite</h1>
      <Counter />
    </main>
  );
});
