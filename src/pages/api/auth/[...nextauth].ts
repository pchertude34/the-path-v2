import NextAuth, { type NextAuthOptions } from 'next-auth';
import Auth0Provider from 'next-auth/providers/auth0';
import { env } from '../../../env/server.mjs';

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: env.AUTH0_CLIENT_ID,
      clientSecret: env.AUTH0_CLIENT_SECRET,
      issuer: env.AUTH0_DOMAIN,
    }),
  ],
  pages: {
    signIn: '/admin/signin',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
