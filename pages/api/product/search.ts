import client from "../../../utils/prismadb";
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
    const prisma = client;
    const products = await prisma.product.findMany({
      take: 8,
      where: {
        title: {
          contains: req.body.query,
          mode: "insensitive",
        },
      },
      orderBy: {
        title: "asc",
      },
    });
    const suggestions = await prisma.product.findMany({
      take: 15,
      where: {
        title: {
          contains: req.body.query,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        title: true,
      },
      orderBy: {
        title: "asc",
      },
    });

    const result = {
      products,
      suggestions,
    };
    await prisma.$disconnect();
    return res.status(200).json(result ? result : "404");
  } catch (err) {
    console.log(err);

    return res.status(500).json(err);
  }
}
