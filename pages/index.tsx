import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.scss";
import Button from "../components/Button";
import Display from "../components/Display";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Webshop</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <div className={styles.hero}>
          <h1>WEBSHOP</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi,
            molestias.
          </p>
          <div>
            <Link href={"/news"}>
              <Button>SHOP LATEST</Button>
            </Link>
            <Link href={"/news"}>
              <Button>SHOP LATEST</Button>
            </Link>
          </div>
        </div>
        <div className={styles.displays}>
          <Display
            link="/"
            btnTitle="BOTTOMS"
            img="/hero-pants.jpg"
            hvrImg="/hero-pants-hvr.jpg"
          />
          <Display
            link="/"
            btnTitle="TOPS"
            img="/hero-top.jpg"
            hvrImg="/hero-top-hvr.jpg"
          />
          <Display
            link="/"
            btnTitle="EYEWEAR"
            img="/hero-acc.jpg"
            hvrImg="/hero-acc-hvr.jpg"
          />
        </div>
      </div>
      <div className={styles.cover}></div>
    </div>
  );
};

export default Home;
