import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserData } from '../../graphql/types/Users';

type UserCardProps = {
  data: UserData;
  className?: string;
};

const UserCard: React.FC<UserCardProps> = ({ data, className }) => {
  return (
    <Card className={className}>
      <Card.Header>
        <h5 className="mb-1" style={{ letterSpacing: '-0.5px' }}>
          {data?.name}
        </h5>
      </Card.Header>
      <Card.Body className="d-flex flex-column">
        <Card.Text className="d-flex flex-column">
          <a href={`mailto:${data?.email}`}>{data?.email}</a>
          <a href={`tel:${data?.phone}`}>{data?.phone}</a>
          <a href={`https://www.${data?.website}`}>{data?.website}</a>
        </Card.Text>
        <Card.Text className="d-flex flex-column flex-grow-1">
          <span>{data?.company?.name}</span>
          <span>{data?.company?.catchPhrase}</span>
          <strong>{data?.company?.bs}</strong>
        </Card.Text>
        <Button
          className="w-100 text-uppercase"
          variant="warning"
          as={Link}
          to={`/user/${data.id}`}
        >
          Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
