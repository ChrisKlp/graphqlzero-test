import { ApolloProvider } from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import createApolloClient from '../graphql/createApolloClient';
import Home from './Home';
import Post from './Post';
import User from './User';

const Root: React.FC = () => {
  const client = createApolloClient();

  return (
    <ApolloProvider client={client}>
      <Router>
        <Container className="py-5">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/user/:id" component={User} />
            <Route path="/post/:id" component={Post} />
          </Switch>
        </Container>
      </Router>
    </ApolloProvider>
  );
};

export default Root;
