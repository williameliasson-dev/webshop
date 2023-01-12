import { GetStaticPropsContext } from "next";
import React from "react";
import { Product } from "../../interface";
import client from "../../utils/prismadb";
import styles from "./id.module.scss";
import Image from "next/image";
import Button from "../../components/Button";
import Suggestions from "../../components/Suggestions/Suggestions";
import { useDispatch } from "react-redux";
import { addProduct } from "../../store/cartSlice";

interface ProductProps {
  product: Product;
  products: Array<Product>;
}

const Product: React.FC<ProductProps> = ({ product, products }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <div className={styles.product}>
        <div>
          <Image
            src={product.imgLink}
            width="500px"
            height="749px"
            alt={`${product.title}`}
          />
        </div>
        <div className={styles["product-content"]}>
          <h2>{product.title}</h2>
          <h3>{product.price} kr</h3>
          <p>{product.desc}</p>
          <Button onClick={() => dispatch(addProduct(product))}>
            ADD TO CART
          </Button>
        </div>
      </div>

      <Suggestions products={products} />
    </div>
  );
};

export default Product;

export async function getStaticPaths() {
  const prisma = client;
  const productsIds = await prisma.product.findMany({
    select: {
      id: true,
    },
  });

  return {
    paths: productsIds.map((p) => {
      return { params: { id: p.id } };
    }),
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const prisma = client;
  const productId: string | undefined = context.params?.id?.toString();
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  const productsCount = await prisma.product.count();
  const skip = Math.floor(Math.random() * productsCount);
  const products = await prisma.product.findMany({
    take: 3,
    skip: skip,
  });

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      products: JSON.parse(JSON.stringify(products)),
    }, // will be passed to the page component as props
    revalidate: 100,
  };
}
