import React from "react";
import Image from "next/image";
import { PrismaClient, Product } from "@prisma/client";
import styles from "../styles/Nyheter.module.scss";

type Props = {
  products: Array<Product>;
};

const Nyheter = ({ products }: Props) => {
  console.log(products);
  return (
    <div className={styles.container}>
      <div className={styles.products}>
        {products.map((product, i) => {
          return (
            <div className={styles.product} key={i}>
              <a className={styles.imagewrapper}>
                <Image layout="fill" alt="product" src={`${product.imgLink}`} />
              </a>
              <h2>{product.title}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Nyheter;

export async function getStaticProps() {
  const prisma = new PrismaClient();
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
