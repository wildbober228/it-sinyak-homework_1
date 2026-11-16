import { observer } from "mobx-react-lite";

import { Rack } from "~/App/Results/components/Rack/Rack";

import { Cassette } from "./Cassette/Cassette";
import { usePresenter } from "./logic/usePresenter";
import { RentalCard } from "./RentalCard/RentalCard";

import styles from "./Shelf.module.css";

export const Shelf = observer(function Shelf() {
  const { label, cassettes, pulledOut } = usePresenter();

  return (
    <div className={styles.shelf}>
      <Rack>
        <ul className={styles.tapes} aria-label={label}>
          {cassettes.map((cassette) => (
            <Cassette
              key={cassette.show.id}
              show={cassette.show}
              isPulledOut={cassette.isPulledOut}
              onPullOut={cassette.pullOut}
            />
          ))}
        </ul>
      </Rack>
      {pulledOut && <RentalCard key={pulledOut.id} show={pulledOut} />}
    </div>
  );
});
