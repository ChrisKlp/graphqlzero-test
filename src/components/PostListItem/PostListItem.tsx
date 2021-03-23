import { faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Card } from 'react-bootstrap';
import { UserPostData } from '../../graphql/types/userPosts';

type PostListItemProps = {
  data: UserPostData;
};

const PostListItem: React.FC<PostListItemProps> = ({ data }) => {
  return (
    <Card className="mb-3">
      <Card.Body className="d-flex align-items-center p-3">
        <Button size="sm" variant="danger" className="mr-3">
          <FontAwesomeIcon icon={faTimes} />
        </Button>
        <h6 className="flex-grow-1">{data.title}</h6>
        <Button size="sm" variant="link" className="ml-3 px-3">
          <FontAwesomeIcon icon={faChevronRight} />
        </Button>
      </Card.Body>
    </Card>
  );
};

export default PostListItem;
