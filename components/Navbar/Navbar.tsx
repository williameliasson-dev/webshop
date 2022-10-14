import React from "react";
import styles from "./Navbar.module.scss";
import Link from "next/link";
import Image from "next/image";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.topbar}>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="feather feather-search"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input placeholder="Sök..." />
        </div>
        <div>
          <Link href="">
            <h1>WEBSHOP</h1>
          </Link>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="feather feather-user"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      </div>
      <nav>
        <Link href="">
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
