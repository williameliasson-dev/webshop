import React, { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.scss";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "../SearchBar/SearchBar";
import Button from "../Button/Button";
import { useSession, signIn, signOut } from "next-auth/react";
import { useAppSelector } from "../../store/hooks";

type Props = {};

const Navbar = (props: Props) => {
  const { data: session }: any = useSession();
  const cart = useAppSelector((state) => state.cart);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleCart, setToggleCart] = useState(false);
  const [searching, setSearching] = useState(false);
  const navref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (toggleMenu && navref.current) {
      navref.current.style.borderBottomColor = "gray";
      if (toggleMenu === true && toggleCart === true) {
        setToggleCart(false);
      }
    } else {
      navref.current
        ? (navref.current.style.borderBottomColor = "black")
        : null;
    }
  }, [toggleMenu]);
  useEffect(() => {
    if (toggleMenu === true && toggleCart === true) {
      setToggleMenu(false);
    }
  }, [toggleCart]);

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.navbar} ref={navref}>
          <Link href={"/"}>
            <h3 onClick={() => setToggleMenu(false)}>WEBSHOP</h3>
          </Link>
          <div className={styles.actions}>
            {cart.products.length > 0 && (
              <Button
                variant="invis"
                onClick={() => setToggleCart(!toggleCart)}
              >
                <div className={styles.cartaction}>
                  {!toggleCart && (
                    <div className={styles.cartaction}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="black"
                        strokeWidth="1.5"
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
                  )}
                  {toggleCart && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="feather feather-x"
                    >
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  )}
                </div>
              </Button>
            )}
            <Button variant="invis" onClick={() => setToggleMenu(!toggleMenu)}>
              {!toggleMenu && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-align-justify"
                >
                  <line x1="21" y1="10" x2="3" y2="10" />
                  <line x1="21" y1="6" x2="3" y2="6" />
                  <line x1="21" y1="14" x2="3" y2="14" />
                  <line x1="21" y1="18" x2="3" y2="18" />
                </svg>
              )}
              {toggleMenu && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-x"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </div>
      {toggleMenu && (
        <div className={styles.dropdown}>
          <div className={styles.searchbar}>
            <SearchBar setSearching={setSearching} />
          </div>
          {searching === false && (
            <div className={styles.links}>
              <nav>
                <Link href={"/news"}>
                  <a onClick={() => setToggleMenu(false)}>NEW ARRIVALS</a>
                </Link>
                <Link href={"/"}>
                  <a onClick={() => setToggleMenu(false)}>DENIM</a>
                </Link>
                <Link href={"/"}>
                  <a onClick={() => setToggleMenu(false)}>FOOTWEAR</a>
                </Link>
              </nav>
            </div>
          )}
        </div>
      )}
      {toggleCart && (
        <div className={styles.cart}>
          <div>
            {cart?.products?.map((p, i) => {
              return (
                <div className={styles.product} key={i}>
                  <div className={styles["product-row"]}>
                    <Image
                      src={p.imgLink}
                      alt="product"
                      height={"70px"}
                      width={"60px"}
                    />
                    <span>
                      <p>{p.title}</p>
                      {p.amount > 1 && <p>Quantity: {p.amount}</p>}
                    </span>

                    <span>
                      <p>Price: {p.price}kr</p>
                      {p.amount > 1 && <p>Total: {p.price * p.amount}kr</p>}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <Link href={"/checkout"}>
            <Button onClick={() => setToggleCart(false)}>Checkout</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
