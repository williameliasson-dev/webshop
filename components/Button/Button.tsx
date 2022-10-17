import React, { ReactElement } from "react";
import styles from "./Button.module.scss";

type Props = {
  variant: string | "btn";
  children: string | ReactElement;
  props: any | null;
};

const Button = ({ variant, children, ...props }: Props) => {
  return <button className={styles[variant]}>{children}</button>;
};

export default Button;
