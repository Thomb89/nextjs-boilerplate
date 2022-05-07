import NextAuth from 'next-auth';
import Credentials, { CredentialInput } from 'next-auth/providers/credentials';

export default NextAuth({
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials<Record<'username' | 'password', CredentialInput>>({
      id: '',
      name: '',
      type: 'credentials',

      async authorize(credentials, _req) {
        if (!credentials) return null;
      },
      credentials: {
        username: {},
        password: {},
      },
    }),
  ],
});
