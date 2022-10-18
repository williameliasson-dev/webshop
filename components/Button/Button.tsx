import React, { ReactElement } from "react";
import styles from "./Button.module.scss";

type Props = {
  variant?: string;
  children: string | ReactElement;
  props?: any | null;
};

const Button = ({ variant, children, ...props }: Props) => {
  return <button className={styles[variant || "btn"]}>{children}</button>;
};

export default Button;
