import { ApolloProvider } from '@apollo/client';
import createApolloClient from '../graphql/createApolloClient';
import Home from './Home';

const Root: React.FC = () => {
  const client = createApolloClient();

  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  );
};

export default Root;
