import React from "react";
import styles from "../styles/404.module.scss";
import Button from "../components/Button";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className={styles.NotFound}>
      <h1>404 the page you are looking for does not exist</h1>
      <Link href="/">
        <Button>Return to home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
