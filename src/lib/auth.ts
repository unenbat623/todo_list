import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import dbConnect from "./db";
import { User } from "@/db/models";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          await dbConnect();
          const user = await User.findOne({ username });

          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) {
            return {
              id: user._id.toString(),
              name: user.username,
              theme: user.theme,
            };
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.theme = user.theme;
      }
      if (trigger === "update" && session?.theme) {
        token.theme = session.theme;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id) {
        session.user.id = token.id as string;
        session.user.theme = token.theme as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
