import { GetStaticPropsContext } from "next";
import React from "react";
import client from "../../../utils/prismadb";
import ProductDisplay from "../../../components/ProductDisplay";
import styles from "./Categories.module.scss";
import { Product } from "../../../interface";

interface ProductsProps {
  products: Array<Product>;
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  return (
    <div className={styles.products}>
      {products?.map((p, i) => (
        <div key={i}>
          <ProductDisplay product={p} />
        </div>
      ))}
    </div>
  );
};

export default Products;

export async function getStaticPaths() {
  const prisma = client;
  const catergories = await prisma.category.findMany({
    select: {
      name: true,
    },
  });
  return {
    paths: catergories.map((c) => {
      return { params: { id: c.name } };
    }),
    fallback: false,
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const prisma = client;
  const category: string | undefined = context.params?.id?.toString();
  const products = await prisma.product.findMany({
    where: {
      category: { name: category },
    },
  });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
