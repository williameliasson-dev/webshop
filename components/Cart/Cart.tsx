import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Cart.module.scss";
import { useAppSelector } from "../../store/hooks";
import Button from "../Button/Button";

type Props = {};

const Cart = (props: Props) => {
  const cart = useAppSelector((state) => state.cart);
  const [drawer, setDrawer] = useState(false);

  return (
    <div>
      {drawer && (
        <div className={styles.drawer}>
          {cart.products.length === 0 && <h3>Din varukorg är tom...</h3>}
          {cart.products.map((p, i) => {
            return (
              <div className={styles.product} key={i}>
                <Image
                  src={p.imgLink}
                  height="139.5px"
                  width="120px"
                  alt="product-img"
                />
                <p>{p.title}</p>
              </div>
            );
          })}
          <Button>Checkout</Button>
        </div>
      )}
      <button className={styles["cart-btn"]} onClick={() => setDrawer(!drawer)}>
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
          {cart.products.length > 0 && <span>{cart.amount}</span>}
        </div>
      </button>
    </div>
  );
};

export default Cart;
