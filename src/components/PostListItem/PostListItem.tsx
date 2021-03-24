import { faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ListGroupItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { userPosts_user_posts_data } from '../../graphql/__generated__/userPosts';

type PostListItemProps = {
  data: userPosts_user_posts_data;
  deletePost: (id: string) => void;
};

const PostListItem: React.FC<PostListItemProps> = ({ data, deletePost }) => {
  return (
    <>
      <ListGroupItem className="d-flex align-items-center p-3">
        <Button
          size="sm"
          variant="danger"
          className="mr-3"
          style={{ minWidth: '32px' }}
          onClick={() => {
            if (data.id != null) {
              deletePost(data.id);
            }
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </Button>
        <h6 className="flex-grow-1">{data.title}</h6>
        <Button
          as={Link}
          to={`/post/${data.id}`}
          size="sm"
          variant="link"
          className="ml-3 px-3 text-secondary"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </Button>
      </ListGroupItem>
    </>
  );
};

export default PostListItem;
