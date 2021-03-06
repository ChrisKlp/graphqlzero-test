import { Button, Card } from 'react-bootstrap';
import { generatePath, Link } from 'react-router-dom';
import { users_users_data } from 'graphql/__generated__/users';
import routes from 'routes';

type UserCardProps = {
  data: users_users_data;
};

const UserCard: React.FC<UserCardProps> = ({ data }) => {
  const { id, name, email, phone, website, company } = data;

  return (
    <Card className="h-100">
      <Card.Header>
        <h5 className="mb-1" style={{ letterSpacing: '-0.5px' }}>
          {name}
        </h5>
      </Card.Header>
      <Card.Body className="d-flex flex-column">
        <Card.Text className="d-flex flex-column">
          <a href={`mailto:${email}`}>{email}</a>
          <a href={`tel:${phone}`}>{phone}</a>
          <a href={`https://www.${website}`}>{website}</a>
        </Card.Text>
        <Card.Text className="d-flex flex-column flex-grow-1">
          <span>{company?.name}</span>
          <span>{company?.catchPhrase}</span>
          <strong>{company?.bs}</strong>
        </Card.Text>
        {id && (
          <Button
            className="w-100 text-uppercase"
            variant="warning"
            as={Link}
            to={generatePath(routes.user, { id })}
          >
            Details
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default UserCard;
