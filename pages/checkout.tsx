import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/Checkout.module.scss";

const Checkout: React.FC = ({}) => {
  const [coHtml, setCoHtml] = useState("");

  useEffect(() => {
    fetchHtml();
  }, []);

  async function fetchHtml() {
    const htmlSnippet = await await axios.get("/api/klarna/createOrder");
    console.log(htmlSnippet.data);
    setCoHtml(await htmlSnippet.data);
  }
  return (
    <div className={styles.klarna}>
      <iframe title="klarnaCheckout" srcDoc={coHtml} frameBorder="0"></iframe>
    </div>
  );
};

export default Checkout;
