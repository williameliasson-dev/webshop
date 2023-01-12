// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Product } from "@prisma/client";
import client from "../../../utils/prismadb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product>
) {
  try {
    if (req.method !== "POST") {
      res.status(405);
      return;
    }
    const prisma = client;

    const newProduct = await prisma.product.create({
      data: {
        title: req.body.title,
        desc: req.body.desc,
        imgLink: req.body.imgLink,
        price: req.body.price,
        category: req.body.category,
      },
    });
    return res.status(200).json(newProduct);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
}
