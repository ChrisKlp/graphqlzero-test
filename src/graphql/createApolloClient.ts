import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const httpLink = new HttpLink({ uri: process.env.REACT_APP_GRAPHQL_URL });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach(({ message }) =>
        Error(`[GraphQL error]: Message: ${message}`)
      );
    if (networkError?.message) {
      Error(`Network Error: ${networkError.message}`);
    }
  });

  const link = from([errorLink, httpLink]);

  return new ApolloClient<NormalizedCacheObject>({
    link,
    cache: new InMemoryCache(),
    connectToDevTools: true,
  });
};

export default createApolloClient;
