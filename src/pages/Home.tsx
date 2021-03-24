import { useQuery } from '@apollo/client';
import { Col, Row } from 'react-bootstrap';
import { UserCard } from '../components';
import { USERS } from '../graphql/queries';
import { users } from '../graphql/__generated__/users';

const Home: React.FC = () => {
  const { data, loading, error } = useQuery<users>(USERS);

  if (loading) {
    return <p>...loading</p>;
  }

  if (error) {
    return <p>Opps... {error.message}</p>;
  }

  return (
    <Row className="g-0">
      {data?.users?.data != null &&
        data?.users?.data.map((user) => (
          <Col sm={6} md={4} lg={3} className="mb-4" key={user?.id}>
            <UserCard data={user} className="h-100" />
          </Col>
        ))}
    </Row>
  );
};

export default Home;
