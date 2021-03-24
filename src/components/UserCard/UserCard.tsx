import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { users_users_data } from '../../graphql/__generated__/users';

type UserCardProps = {
  data: users_users_data;
  className?: string;
};

const UserCard: React.FC<UserCardProps> = ({ data, className }) => {
  const { id, name, email, phone, website, company } = data;

  return (
    <Card className={className}>
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
        <Button
          className="w-100 text-uppercase"
          variant="warning"
          as={Link}
          to={`/user/${id}`}
        >
          Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
