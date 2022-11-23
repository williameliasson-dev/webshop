import React from "react";
import Image from "next/image";
import Link from "next/link";

import client from "../utils/prismadb";
import styles from "../styles/Nyheter.module.scss";
import Button from "../components/Button";
import ProductDisplay from "../components/ProductDisplay";

type Props = {
  products: Array<Product>;
};

const News = ({ products }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.products}>
        {products.map((p, i) => {
          return (
            <div key={i}>
              <ProductDisplay product={p} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default News;

export async function getStaticProps() {
  const prisma = client;
  const products = await prisma.product.findMany({
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
    take: 10,
  });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    }, // will be passed to the page component as props
  };
}
