import React, { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import SearchBar from "../SearchBar/SearchBar";
import Cart from "../Cart/Cart";
import { useSession, signIn, signOut } from "next-auth/react";

type Props = {};

const Navbar = (props: Props) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { data: session }: any = useSession();
  const router = useRouter();
  const h1nav = useRef<HTMLHeadingElement>(null);
  const nav = useRef<HTMLElement>(null);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    if (h1nav.current === null || nav.current === null) return;
    h1nav.current.style.fontSize = scrollPosition === 0 ? "3rem" : "2rem";
    nav.current.style.margin = scrollPosition === 0 ? "25px 0px" : "10px 0px";
  }, [scrollPosition]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.topbar}>
        <div className={styles["topbar-item"]}>
          <SearchBar />
        </div>
        <div className={styles["topbar-item"]}>
          <Link href="/">
            <h1 ref={h1nav}>WEBSHOP</h1>
          </Link>
        </div>
        <div className={styles["topbar-item"]}>
          {session?.admin === true && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-shield"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          )}
          <button
            onClick={() => {
              session ? signOut() : signIn();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-user"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
          <Cart />
        </div>
      </div>
      <nav ref={nav}>
        <Link href="/nyheter">
          <a>Nyheter</a>
        </Link>
        <Link href="">
          <a>Bästsäljare</a>
        </Link>
        <Link href="">
          <a>Kläder</a>
        </Link>
        <Link href="">
          <a>Tillbehör</a>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
