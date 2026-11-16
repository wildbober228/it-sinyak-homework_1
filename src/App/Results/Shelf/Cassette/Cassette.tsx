import { observer } from "mobx-react-lite";

import { Cover } from "./Cover/Cover";
import type { CassetteProps } from "./logic/usePresenter";
import { usePresenter } from "./logic/usePresenter";
import { Spine } from "./Spine/Spine";

import styles from "./Cassette.module.css";

export const Cassette = observer(function Cassette(props: CassetteProps) {
  const {
    className,
    title,
    year,
    image,
    catalogNumber,
    spineHitLabel,
    coverHitLabel,
    isPulledOut,
    pullOut,
  } = usePresenter(props);

  return (
    <li className={styles.slot}>
      <button
        className={className}
        type="button"
        aria-label={title}
        aria-pressed={isPulledOut}
        onMouseEnter={pullOut}
        onFocus={pullOut}
        onClick={pullOut}
      >
        <Spine
          title={title}
          year={year}
          catalogNumber={catalogNumber}
          hitLabel={spineHitLabel}
        />
        <Cover title={title} image={image} hitLabel={coverHitLabel} />
      </button>
    </li>
  );
});
