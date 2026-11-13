import type { ComponentProps } from "react";

import styles from "./Button.module.css";

export type ButtonProps = Omit<ComponentProps<"button">, "className"> & {
  /** primary — залитая акцентом, secondary — контурная */
  variant?: "primary" | "secondary";
  size?: "md" | "sm";
  /** circle — круг для коротких подписей: номер страницы, стрелка */
  shape?: "pill" | "circle";
  /** Выбранное состояние: текущая страница, активный фильтр */
  isActive?: boolean;
};

export function usePresenter(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    shape = "pill",
    isActive = false,
    ...buttonProps
  } = props;

  const className = [
    styles.button,
    styles[variant],
    styles[size],
    shape === "circle" && styles.circle,
    isActive && styles.active,
  ]
    .filter(Boolean)
    .join(" ");

  return { className, buttonProps };
}
