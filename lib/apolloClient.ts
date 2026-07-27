import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export function createApolloClient(graphqlUrl: string) {
  return new ApolloClient({
    // ssrMode: typeof window === 'undefined',
    link: new HttpLink({
      uri: graphqlUrl,
    }),
    cache: new InMemoryCache(),
  });
}
