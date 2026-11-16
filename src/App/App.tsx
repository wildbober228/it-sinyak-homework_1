import { observer } from "mobx-react-lite";

import { LanguageSwitch } from "./LanguageSwitch/LanguageSwitch";
import { usePresenter } from "./logic/usePresenter";
import { Results } from "./Results/Results";
import { SearchBar } from "./SearchBar/SearchBar";

import styles from "./App.module.css";

export const App = observer(function App() {
  const { className, eyebrow, sign, tagline, taglineAccent } = usePresenter();

  return (
    <main className={className}>
      <div className={styles.toolbar}>
        <LanguageSwitch />
      </div>
      <header className={styles.header}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <h1 className={styles.sign}>{sign}</h1>
        <p className={styles.tagline}>
          {tagline} <span className={styles.accent}>{taglineAccent}</span>
        </p>
      </header>
      <SearchBar />
      <Results />
    </main>
  );
});
