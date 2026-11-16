import { observer } from "mobx-react-lite";

import { usePresenter } from "./logic/usePresenter";

import styles from "./LanguageSwitch.module.css";

export const LanguageSwitch = observer(function LanguageSwitch() {
  const { label, options } = usePresenter();

  return (
    <fieldset className={styles.switch} aria-label={label}>
      {options.map((option) => (
        <button
          key={option.code}
          className={styles.option}
          type="button"
          lang={option.code}
          title={option.name}
          aria-pressed={option.isActive}
          onClick={option.onSelect}
        >
          {option.short}
        </button>
      ))}
    </fieldset>
  );
});
