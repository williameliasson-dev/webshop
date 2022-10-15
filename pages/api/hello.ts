// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../utils/prismadb";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    if (req.method !== "POST") {
      res.status(405);
      return;
    }
  } catch (err) {
    console.log(err);
  }
}
