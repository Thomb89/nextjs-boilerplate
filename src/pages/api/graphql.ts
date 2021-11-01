import { ApolloServer } from 'apollo-server-micro';
import { ApolloServerPluginCacheControl } from 'apollo-server-core';
import { NextApiRequest, PageConfig } from 'next';
import { getSession } from 'next-auth/client';
import { createContext } from '../../graphql/context';
import { MicroRequest } from 'apollo-server-micro/dist/types';
import { ServerResponse } from 'http';

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

export const config: PageConfig = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};

const startServer = apolloServer.start();
const start = async (req: MicroRequest, res: ServerResponse) => {
  await startServer;
  await apolloServer.createHandler({ path: '/api/graphql' })(req, res);
};
export default start;
