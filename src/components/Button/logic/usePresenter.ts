import type { ComponentProps } from "react";

import styles from "~/components/Button/Button.module.css";

export type ButtonProps = Omit<ComponentProps<"button">, "className"> & {
  variant?: "primary" | "secondary";
  size?: "md" | "sm";
  shape?: "pill" | "circle";
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
