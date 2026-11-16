import { observer } from "mobx-react-lite";

import { Rack } from "~/App/Results/components/Rack/Rack";

import { usePresenter } from "./logic/usePresenter";

import styles from "./Rewind.module.css";

export const Rewind = observer(function Rewind() {
  const { status, placeholders } = usePresenter();

  return (
    <div className={styles.rewind} role="status" aria-busy="true">
      <Rack>
        <ul className={styles.tapes}>
          {placeholders.map((placeholder) => (
            <li key={placeholder} className={styles.tape} />
          ))}
        </ul>
      </Rack>
      <p className={styles.osd}>
        <span aria-hidden="true">◀◀</span> {status}
      </p>
    </div>
  );
});
