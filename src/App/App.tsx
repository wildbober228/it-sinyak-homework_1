import { observer } from "mobx-react-lite";

import { Results } from "./Results/Results";
import { SearchBar } from "./SearchBar/SearchBar";
import { ShowsStoreContext } from "./ShowsStoreContext";
import { usePresenter } from "./usePresenter";

import styles from "./App.module.css";

export const App = observer(function App() {
  const { store, className } = usePresenter();

  return (
    <ShowsStoreContext value={store}>
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
    </ShowsStoreContext>
  );
});
