import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PrismaClient, Product } from "@prisma/client";
import styles from "../styles/Nyheter.module.scss";
import Button from "../components/Button/Button";

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
              <Link href={""}>
                <a className={styles.imagewrapper}>
                  <Image
                    layout="fill"
                    alt="product"
                    src={`${product.imgLink}`}
                  />
                </a>
              </Link>
              <h2>{product.title}</h2>
              <p>{product.desc}</p>
              <p>{product.price}kr</p>
              <Button variant="btn">Köp</Button>
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
