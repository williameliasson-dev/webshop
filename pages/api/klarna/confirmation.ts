// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Product } from "@prisma/client";
import client from "../../../utils/prismadb";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = any;

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
  async function retriveOrder() {
    const auth = getKlarnaAuth();
    const url = "https://api.playground.klarna.com/checkout/v3/orders";
    return await axios.get(url + `/${req.query.order_id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: auth,
      },
    });
  }
  try {
    if (req.method === "GET") {
      res.send((await retriveOrder()).data.html_snippet);
    }
  } catch (err) {
    console.log(err);
    res.status(500);
  }
}
