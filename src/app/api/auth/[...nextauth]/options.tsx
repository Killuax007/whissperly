/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcrypt";
import UserModel from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        identifier: { label: "Identifier", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        if (!credentials || !credentials.identifier || !credentials.password) {
          throw new Error("Missing credentials");
        }

        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });
          if (!user) {
            throw new Error("User not found ! Try Signup instead");
          }
          if (!user.isVerified) {
            throw new Error("User not verified. Please verify your account ");
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("password mismatch");
          }
        } catch (error) {
          console.log(error);
          throw new Error("Internal server error");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.username = user.username;
        token.isVerified = user.isVerified;
        token.isAcceptingMessage = user.isAcceptingMessage;
      }
      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user._id = token._id as string;
        session.user.username = token.username as string;
        session.user.isVerified = token.isVerified as boolean;
        session.user.isAcceptingMessage = token.isAcceptingMessage as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.SECRET_KEY,
};
