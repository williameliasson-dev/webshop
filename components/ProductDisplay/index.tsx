import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./ProductDisplay.module.scss";
import { Product } from "../../interface";
import Button from "../Button";
import { useDispatch } from "react-redux";
import { addProduct } from "../../store/cartSlice";
interface ProductDisplayProps {
  product: Product;
}

const ProductDisplay: React.FC<ProductDisplayProps> = ({ product }) => {
  const dispatch = useDispatch();
  return (
    <div className={styles.product}>
      <Link href={""}>
        <a className={styles.imagewrapper}>
          <Image layout="fill" alt="product" src={`${product.imgLink}`} />
        </a>
      </Link>
      <h2>{product.title}</h2>
      <p>{product.price}kr</p>
      <Button variant="btn" onClick={() => dispatch(addProduct(product))}>
        Köp
      </Button>
    </div>
  );
};

export default ProductDisplay;
