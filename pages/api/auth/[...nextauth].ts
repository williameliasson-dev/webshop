import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../utils/prismadb";
export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      // @ts-ignore
      clientId: process.env.GITHUB_CLIENT,
      // @ts-ignore
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session }: any) {
      let isAdmin = false;
      const admin = await prisma.user.findFirst({
        where: {
          role: "ADMIN",
          email: session.user.email,
        },
      });
      admin?.email === (await session.user.email)
        ? (isAdmin = true)
        : (isAdmin = false);
      session = { ...session, admin: isAdmin };
      return session;
    },
  },
};
export default NextAuth(authOptions);
