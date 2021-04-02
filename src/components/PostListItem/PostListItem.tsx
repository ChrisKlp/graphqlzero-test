import { useCallback } from 'react';
import { faChevronRight, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ListGroupItem } from 'react-bootstrap';
import { generatePath, Link } from 'react-router-dom';
import { userPosts_user_posts_data } from 'graphql/__generated__/userPosts';
import routes from 'routes';

type PostListItemProps = {
  data: userPosts_user_posts_data;
  handleDeletePost: (id: string) => void;
};

const PostListItem: React.FC<PostListItemProps> = ({
  data,
  handleDeletePost,
}) => {
  const { id, title } = data;

  const deletePost = useCallback(() => {
    if (id) {
      handleDeletePost(id);
    }
  }, [handleDeletePost, id]);

  return (
    <ListGroupItem className="d-flex align-items-center p-3">
      <Button
        size="sm"
        variant="danger"
        className="mr-3"
        style={{ minWidth: '32px' }}
        onClick={deletePost}
      >
        <FontAwesomeIcon icon={faTimes} />
      </Button>
      <h6 className="flex-grow-1">{title}</h6>
      {id && (
        <Button
          as={Link}
          to={generatePath(routes.post, { id })}
          size="sm"
          variant="link"
          className="ml-3 px-3 text-secondary"
          data-testid="postlink"
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </Button>
      )}
    </ListGroupItem>
  );
};

export default PostListItem;
