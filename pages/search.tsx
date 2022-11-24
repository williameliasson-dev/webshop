import React from "react";
import { useRouter } from "next/router";
import client from "../utils/prismadb";
import styles from "../styles/Nyheter.module.scss";
import ProductDisplay from "../components/ProductDisplay";
import { Product } from "../interface";

type Props = {
  products: Array<Product>;
};

const Search = ({ products }: Props) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h2>SHOWING RESULTS FOR: {router.query.products}</h2>
      <div className={styles.products}>
        {products.map((product, i) => {
          return (
            <div key={i}>
              <ProductDisplay product={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;

export async function getServerSideProps({ query }: any) {
  const prisma = client;
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
