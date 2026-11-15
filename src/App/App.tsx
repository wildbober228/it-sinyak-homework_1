import { observer } from "mobx-react-lite";

import { usePresenter } from "./logic/usePresenter";
import { Results } from "./Results/Results";
import { SearchBar } from "./SearchBar/SearchBar";

import styles from "./App.module.css";

export const App = observer(function App() {
  const { className } = usePresenter();

  return (
    <main className={className}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>Поиск сериалов · TVmaze</p>
        <h1 className={styles.title}>
          Что посмотрим <span className={styles.accent}>сегодня?</span>
        </h1>
      </header>
      <SearchBar />
      <Results />
    </main>
  );
});
