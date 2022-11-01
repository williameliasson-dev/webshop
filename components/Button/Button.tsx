import React, { ReactElement } from "react";
import styles from "./Button.module.scss";

type Props = {
  variant?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ variant, children, ...props }: Props) => {
  return (
    <button {...props} className={styles[variant || "btn"]}>
      {children}
    </button>
  );
};

export default Button;
