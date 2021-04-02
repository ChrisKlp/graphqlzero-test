import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { Col, Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { UserCard, UserCardSkeleton } from 'components';
import { USERS } from 'graphql/queries';
import { users } from 'graphql/__generated__/users';
import generateArray from 'utils/generateArray';
import routes from 'routes';

const Home: React.FC = () => {
  const { data, loading, error } = useQuery<users>(USERS);
  const history = useHistory();

  useEffect(() => {
    if (error) {
      history.push({
        pathname: routes.error,
        state: { error },
      });
    }
  }, [error, history]);

  if (loading) {
    const loadingUsers = generateArray(12).map((_, index) => (
      <Col sm={6} md={4} lg={3} className="mb-4" key={index}>
        <UserCardSkeleton />
      </Col>
    ));

    return <Row data-testid="loading">{loadingUsers}</Row>;
  }

  return (
    <Row>
      {data?.users?.data &&
        data?.users?.data.map((user) => (
          <Col sm={6} md={4} lg={3} className="mb-4" key={user?.id}>
            {user && <UserCard data={user} />}
          </Col>
        ))}
    </Row>
  );
};

export default Home;
