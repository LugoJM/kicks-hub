import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./lib/prisma";
import bcrypt from 'bcryptjs';

const requireAuthRoutes = [
  "/checkout",
  "/profile",
  "/orders"
];

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },
  callbacks : {
    jwt({token,user}){
      if(user){
        token.data = user;
      }
      return token;
    },
    session({session, token}){
      session.user = token.data as any;
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdmin = auth?.user.role === "admin";

      const isAuthRequiredRoute = requireAuthRoutes.some(route => nextUrl.pathname.startsWith(route));
      if (isAuthRequiredRoute) {
        if (!isLoggedIn)return false;
      } else if (isLoggedIn) {
        if(nextUrl.pathname.startsWith("/admin") && !isAdmin) return false;
        return true;
      }
      return true;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(8) })
          .safeParse(credentials);

        if(!parsedCredentials.success) return null;
        
        const { email, password } = parsedCredentials.data;

        const user = await prisma.user.findUnique({where : { email : email.toLowerCase() }});

        if(!user) return null;

        if(!bcrypt.compareSync(password, user.password)) return null;

        const { password : _, ...userInfo } = user;

        return userInfo;
      },
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
