import React, { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import SearchBar from "../SearchBar/SearchBar";
import Button from "../Button/Button";
import Cart from "../Cart/Cart";
import { useSession, signIn, signOut } from "next-auth/react";

type Props = {};

const Navbar = (props: Props) => {
  const { data: session }: any = useSession();
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.navbar}>
          <h3>WEBSHOP</h3>
          <div className={styles.actions}>
            {" "}
            <Cart />
            <Button variant="invis" onClick={() => setToggleMenu(!toggleMenu)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 20"
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
            </Button>
          </div>
        </div>
      </div>
      {toggleMenu && <div>aaa</div>}
    </div>
  );
};

export default Navbar;
