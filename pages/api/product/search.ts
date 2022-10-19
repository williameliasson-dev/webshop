import { PrismaClient, Product } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      res.status(405);
      return;
    }
    const prisma = new PrismaClient();
    const result = await prisma.product.findMany({
      take: 10,
      orderBy: {
        _relevance: {
          fields: ["title", "desc", "keywords"],
          search: req.body.query.split(" ").join(" & "),
          sort: "desc",
        },
      },
    });
    return res.status(200).json(result ? result : "404");
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}
