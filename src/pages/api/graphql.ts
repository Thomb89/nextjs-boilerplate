import { ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginCacheControl } from 'apollo-server-core';
import { NextApiRequest, PageConfig } from 'next';
import { getSession } from 'next-auth/client';
import { createContext } from '../../graphql/context';

const apolloServer = new ApolloServer({
  typeDefs: undefined,
  resolvers: undefined,
  rootValue: {},
  plugins: [
    ApolloServerPluginCacheControl({
      defaultMaxAge: 10,
    }),
  ],
  context: async ({ req }: { req: NextApiRequest }) => {
    const session = await getSession({ req });

    return createContext(session?.user);
  },
});
await apolloServer.start();

export const config: PageConfig = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
