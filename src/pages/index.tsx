import { ApolloProvider } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import createApolloClient from 'graphql/createApolloClient';
import Home from 'pages/Home';
import Post from 'pages/Post';
import User from 'pages/User';
import NetworkError from 'pages/NetworkError';
import routes from 'routes';
import 'styles/index.css';

const Root: React.FC = () => {
  const client = createApolloClient();

  return (
    <ApolloProvider client={client}>
      <Router>
        <Container className="py-5">
          <Switch>
            <Route exact path={routes.home} component={Home} />
            <Route path={routes.user} component={User} />
            <Route path={routes.post} component={Post} />
            <Route exact path={routes.error} component={NetworkError} />
          </Switch>
        </Container>
      </Router>
    </ApolloProvider>
  );
};

export default Root;
