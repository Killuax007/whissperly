import { DefaultSession } from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      _id: string;
      username: string;
      isVerified: boolean;
      isAcceptingMessage: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    _id: string;
    username: string;
    isVerified: boolean;
    isAcceptingMessage: boolean;
  }

  interface JWT {
    _id: string;
    username: string;
    isVerified: boolean;
    isAcceptingMessage: boolean;
  }
}
