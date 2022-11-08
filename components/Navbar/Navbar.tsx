import React, { useState, useEffect, useRef } from "react";
import styles from "./Navbar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import SearchBar from "../SearchBar/SearchBar";
import Cart from "../Cart/Cart";
import { useSession, signIn, signOut } from "next-auth/react";

type Props = {};

const Navbar = (props: Props) => {
  const { data: session }: any = useSession();

  return <div className={styles.container}></div>;
};

export default Navbar;
