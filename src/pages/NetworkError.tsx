/* eslint-disable react/destructuring-assignment */
import { ApolloError } from '@apollo/client';
import { Alert } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';

type NetworkErrorProps = {
  error: ApolloError;
};

type Props = RouteComponentProps<
  Record<string, never>,
  never,
  NetworkErrorProps
>;

const NetworkError: React.FC<Props> = ({ location }) => {
  const { message } = location.state.error;

  return (
    <div>
      <Alert variant="danger">Opps... {message}</Alert>
      <a
        href="/"
        className="btn btn-primary m-auto d-block"
        style={{ maxWidth: '200px' }}
      >
        Try Again
      </a>
    </div>
  );
};

export default NetworkError;
