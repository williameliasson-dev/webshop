import { GetStaticPropsContext } from "next";
import React from "react";
import { Product } from "../../interface";
import client from "../../utils/prismadb";

interface ProductProps {
  product: Product;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  return <div>{product?.price}</div>;
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
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
    }, // will be passed to the page component as props
  };
}
