import type { ComponentProps } from "react";

import { observer } from "mobx-react-lite";

import styles from "./Button.module.css";

type ButtonProps = ComponentProps<"button">;

export const Button = observer(function Button(props: ButtonProps) {
  return <button type="button" className={styles.button} {...props} />;
});
