import { ApolloClient, HttpLink, InMemoryCache, makeVar, NormalizedCacheObject } from '@apollo/client';

export const isDarkMode = makeVar<boolean>(true);

let client: ApolloClient<NormalizedCacheObject> | undefined = undefined;

const createApolloClient = (ssrMode: boolean, cookie?: string) =>
  new ApolloClient({
    ssrMode,
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: ssrMode ? 'http://localhost:3000/api/graphql' : '/api/graphql',
      credentials: 'same-origin',
      headers: { cookie },
    }),
    connectToDevTools: true,
  });

export const getApolloClient = (cookie?: string) => {
  const ssrMode = typeof window === 'undefined';

  const apolloClient = client ?? createApolloClient(ssrMode, cookie);
  if (!ssrMode) client = apolloClient;

  return apolloClient;
};
