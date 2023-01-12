import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/Checkout.module.scss";
import { useAppSelector } from "../store/hooks";

const Checkout: React.FC = ({}) => {
  const [coHtml, setCoHtml] = useState("");
  const cart = useAppSelector((state) => state.cart);

  useEffect(() => {
    async function fetchHtml() {
      const products = cart.products.map((p) => {
        return { id: p.id, amount: p.amount };
      });

      const htmlSnippet = await axios.post("/api/klarna/createOrder", {
        products,
      });
      setCoHtml(await htmlSnippet.data);
    }
    fetchHtml();
  }, []);

  return (
    <div className={styles.klarna}>
      {coHtml !== "" && (
        <iframe title="klarnaCheckout" srcDoc={coHtml} frameBorder="0"></iframe>
      )}
      {coHtml === "" && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-loader"
        >
          <line x1="12" y1="2" x2="12" y2="6"></line>
          <line x1="12" y1="18" x2="12" y2="22"></line>
          <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
          <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
          <line x1="2" y1="12" x2="6" y2="12"></line>
          <line x1="18" y1="12" x2="22" y2="12"></line>
          <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
          <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
        </svg>
      )}
    </div>
  );
};

export default Checkout;
