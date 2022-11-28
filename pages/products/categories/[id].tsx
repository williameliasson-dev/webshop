import { GetStaticPropsContext } from "next";
import React from "react";
import client from "../../../utils/prismadb";

interface ProductsProps {}

const Products: React.FC<ProductsProps> = ({}) => {
  return <div>Products</div>;
};

export default Products;

export async function getStaticPaths() {
  const prisma = client;
  const productCategories = await prisma.product.findMany({
    select: {
      category: true,
    },
  });
  return {
    paths: productCategories.map((c) => {
      console.log(c.category);
      return { params: { id: c.category } };
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
