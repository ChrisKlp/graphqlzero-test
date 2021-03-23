import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';

const createApolloClient = (): ApolloClient<NormalizedCacheObject> => {
  const httpLink = new HttpLink({ uri: 'https://graphqlzero.almansi.me/api' });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message }) =>
        console.log(`Graphql Error ${message}`)
      );
    }
    if (networkError?.message) {
      console.log(`Network Error ${networkError.message}`);
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
