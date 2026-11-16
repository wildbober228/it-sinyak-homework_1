import { observer } from "mobx-react-lite";

import { FavoriteItem } from "./FavoriteItem/FavoriteItem";
import type { FavoritesMenuProps } from "./logic/usePresenter";
import { usePresenter } from "./logic/usePresenter";

import styles from "./FavoritesMenu.module.css";

export const FavoritesMenu = observer(function FavoritesMenu(
  props: FavoritesMenuProps,
) {
  const { title, note, hasItems, items } = usePresenter(props);

  return (
    <section className={styles.menu} aria-label={title}>
      <h2 className={styles.title}>{title}</h2>
      {note && <p className={styles.note}>{note}</p>}
      {hasItems && (
        <ul className={styles.list}>
          {items.map((item) => (
            <FavoriteItem
              key={item.show.id}
              show={item.show}
              isMarked={item.isMarked}
              onToggle={item.toggle}
            />
          ))}
        </ul>
      )}
    </section>
  );
});
