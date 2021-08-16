import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  debug: process.env.NODE_ENV !== 'production',
  secret: process.env.JWT,
  pages: {
    signIn: '/login',
  },
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials: { username: string; password: string }, _req) {
        return null;
      },
    }),
  ],
});
