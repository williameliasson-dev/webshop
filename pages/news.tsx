import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../interface";
import client from "../utils/prismadb";
import styles from "../styles/Nyheter.module.scss";
import Button from "../components/Button/Button";
import { useDispatch } from "react-redux";
import { addProduct } from "../store/cartSlice";

type Props = {
  products: Array<Product>;
};

const News = ({ products }: Props) => {
  const dispatch = useDispatch();
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
              <p>{product.price}kr</p>
              <Button
                variant="btn"
                onClick={() => dispatch(addProduct(product))}
              >
                Köp
              </Button>
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
