import { observer } from "mobx-react-lite";

import { FavoriteStar } from "~/App/components/FavoriteStar/FavoriteStar";

import type { FavoriteItemProps } from "./logic/usePresenter";
import { usePresenter } from "./logic/usePresenter";

import styles from "./FavoriteItem.module.css";

export const FavoriteItem = observer(function FavoriteItem(
  props: FavoriteItemProps,
) {
  const { className, image, title, meta, isActive, starLabel, toggle } =
    usePresenter(props);

  return (
    <li className={className}>
      {image ? (
        <img className={styles.poster} src={image} alt="" />
      ) : (
        <span className={styles.noPoster} aria-hidden="true">
          📼
        </span>
      )}
      <span className={styles.text}>
        <span className={styles.title}>{title}</span>
        <span className={styles.meta}>{meta}</span>
      </span>
      <FavoriteStar
        isActive={isActive}
        isBusy={false}
        label={starLabel}
        onToggle={toggle}
      />
    </li>
  );
});
