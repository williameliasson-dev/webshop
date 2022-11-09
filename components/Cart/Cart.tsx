import React, { useState, useEffect } from "react";
import styles from "./Cart.module.scss";
import { useAppSelector } from "../../store/hooks";

type Props = {};

const Cart = (props: Props) => {
  return (
    <div>
      <button className={styles["cart-btn"]}>
        <div className={styles.cart}></div>
      </button>
    </div>
  );
};

export default Cart;
