import React from "react";
import styles from "./Cart.module.scss";

import { useAppSelector, useAppDispatch } from "../../store/hooks";

type Props = {};

const Cart = (props: Props) => {
  const cart = useAppSelector((state) => state.cart.products);

  return (
    <div className={styles.cart}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-shopping-cart"
      >
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      {cart.length > 0 && <span>{cart.length}</span>}
    </div>
  );
};

export default Cart;
