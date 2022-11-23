import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Button from "../components/Button";
import { PrismaClient, Product } from "@prisma/client";
import styles from "../styles/Nyheter.module.scss";

type Props = {
  products: Array<Product>;
};

const Search = ({ products }: Props) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1>Visar resultat för: {router.query.products}</h1>
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

export default Search;

export async function getServerSideProps({ query }: any) {
  const prisma = new PrismaClient();
  const products = await prisma.product.findMany({
    take: 10,
    where: {
      title: {
        contains: query.products,
        mode: "insensitive",
      },
    },
    orderBy: {
      title: "asc",
    },
  });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    }, // will be passed to the page component as props
  };
}
