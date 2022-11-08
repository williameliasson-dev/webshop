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
  async function createOrder(products: Array<Product>) {
    const prisma = client;
    const idList = products.map((p) => p.id);
    const dbProducts = await prisma.product.findMany({
      where: {
        id: { in: idList },
      },
    });
    const auth = getKlarnaAuth();
    const url = "https://api.playground.klarna.com/checkout/v3/orders";
    const productsObj: Record<string, { name: string; price: number }> = {};
    for (const product of dbProducts) {
      productsObj[product.id] = { name: product.title, price: product.price };
    }
    const orderInfo = products.map((p, i) => {
      const curProduct = productsObj[p.id];
      const name = curProduct.name;
      const price = curProduct.price;
      let amount = products.find((p) => p.id === idList[i])?.amount;
      if (price && amount) {
        return {
          type: "physical",
          reference: p.id,
          name,
          quantity: amount,
          quantity_unit: "pcs",
          unit_price: price * 100,
          tax_rate: 2500,
          total_amount: price * 100 * amount,
          total_discount_amount: 0,
          total_tax_amount: Math.floor(price * 100 * amount * 0.2),
        };
      }
    });
    const order_amount = products
      .map((_, i) => {
        let amount = products.find((p) => p.id === idList[i])?.amount;
        let price = dbProducts.find((p) => p.id === idList[i])?.price;
        if (price && amount) {
          return price * 100 * amount;
        } else return 0;
      })
      .reduce((prev, cur) => prev + cur);
    const order_tax_amount = Math.floor(order_amount * 0.2);

    // nts: order-lines är min kundvagn så kan göra en map där (:
    const payload = {
      purchase_country: "SE",
      purchase_currency: "SEK",
      locale: "sv-SE",
      order_amount: order_amount,
      order_tax_amount: order_tax_amount,
      order_lines: [...orderInfo],
      merchant_urls: {
        terms: "https://www.example.com/terms.html",
        checkout:
          "https://www.example.com/checkout.html?order_id={checkout.order.id}",
        confirmation:
          process.env.REDIRECT_URL +
          "/api/klarna/confirmation?order_id={checkout.order.id}",
        push: "https://www.example.com/api/push?order_id={checkout.order.id}",
      },
    };
    console.log(payload);
    return await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
    });
  }
  try {
    if (req.method === "POST") {
      res.send((await createOrder(req.body.products)).data.html_snippet);
    }
  } catch {}
}
