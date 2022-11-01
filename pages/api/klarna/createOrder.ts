// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "../../../interface";
import client from "../../../utils/prismadb";
import axios from "axios";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  function getKlarnaAuth() {
    const client = process.env.KLARNA_CLIENT;
    const secret = process.env.KLARNA_SECRET;
    const auth =
      "Basic " + Buffer.from(client + ":" + secret).toString("base64");
    return auth;
  }
  async function createOrder() {
    const auth = getKlarnaAuth();
    const url = "https://api.playground.klarna.com/checkout/v3/orders";
    const product = {
      id: "10",
      name: "test",
      price: 20,
    };
    const quantity = 1;
    const price = product.price * 100;
    const total_amount = price * quantity;
    const total_tax_amount = total_amount * 0.2;

    // nts: order-lines är min kundvagn så kan göra en map där (:
    const payload = {
      purchase_country: "SE",
      purchase_currency: "SEK",
      locale: "sv-SE",
      order_amount: total_amount,
      order_tax_amount: total_tax_amount,
      order_lines: [
        {
          type: "physical",
          reference: product.id,
          name: product.name,
          quantity,
          quantity_unit: "pcs",
          unit_price: price,
          tax_rate: 2500,
          total_amount: total_amount,
          total_discount_amount: 0,
          total_tax_amount,
        },
      ],
      merchant_urls: {
        terms: "https://www.example.com/terms.html",
        checkout:
          "https://www.example.com/checkout.html?order_id={checkout.order.id}",
        confirmation:
          process.env.REDIRECT_URL +
          "/confirmation?order_id={checkout.order.id}",
        push: "https://www.example.com/api/push?order_id={checkout.order.id}",
      },
    };
    return await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
    });
  }
  try {
    if (req.method !== "POST") {
      res.send((await createOrder()).data.html_snippet);
    }
  } catch {}
}
