import React from "react";
import clsx from "clsx";
import styles from "./Button.module.css";

type ButtonVariant = "primary" | "outline" | 'danger';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: React.ReactNode;
};

export default function Button({ variant = "primary", children, className, ...rest }: Props) {
  return (
    <button
      {...rest}
      className={clsx(styles.button, styles[variant], className)}
    >
      {children}
    </button>
  );
}
