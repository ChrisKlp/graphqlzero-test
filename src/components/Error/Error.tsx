import { ApolloError } from '@apollo/client';
import { Alert } from 'react-bootstrap';

type ErrorProps = {
  error: ApolloError | undefined;
};

const Error: React.FC<ErrorProps> = ({ error }) => {
  return (
    <div>
      <Alert variant="danger">Opps... {error?.message}</Alert>
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

export default Error;
