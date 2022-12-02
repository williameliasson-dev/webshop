import React from "react";
import client from "../../utils/prismadb";
import { Product } from "../../interface";
import ProductDisplay from "../ProductDisplay";
import styles from "./Suggestions.module.scss";

interface SuggestionsProps {
  products: Array<Product>;
}

const Suggestions: React.FC<SuggestionsProps> = ({ products }) => {
  return (
    <div className={styles.suggestions}>
      {products?.map((p, i) => (
        <div key={i}>
          <ProductDisplay product={p} />
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
