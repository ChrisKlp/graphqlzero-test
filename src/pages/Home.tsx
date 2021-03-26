import { useQuery } from '@apollo/client';
import { Col, Row } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { UserCard, UserCardSkeleton } from '../components';
import { USERS } from '../graphql/queries';
import { users } from '../graphql/__generated__/users';

const Home: React.FC = () => {
  const { data, loading, error } = useQuery<users>(USERS);

  if (loading) {
    const loadingUsers = [];

    for (let i = 0; i < 12; i += 1) {
      loadingUsers.push(
        <Col sm={6} md={4} lg={3} className="mb-4" key={i}>
          <UserCardSkeleton />
        </Col>
      );
    }
    return <Row data-testid="loading">{loadingUsers}</Row>;
  }

  if (error)
    return <Redirect to={{ pathname: '/network-error', state: { error } }} />;

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
