import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import prisma from '../../../lib/prismadb';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  // [next-auth][warn][NO_SECRET]
  // https://next-auth.js.org/warnings#no_secret
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // it will be called
    async session({ session, token, user }) {
      console.log('inside of the session callback');
      // session.accessToken = token.accessToken;
      // return {
      //   ...session,
      //   customProperty: 'rick ', // here will add the customproperty on sesson!!
      // };
      return {
        ...session,
        user: {
          ...session.user,
          ...user, // user from database
        },
      };
    },
  },
});
