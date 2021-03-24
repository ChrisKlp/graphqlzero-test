import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { post_post_comments } from '../../graphql/__generated__/post';

type CommentsProps = {
  data: post_post_comments | null;
  showModal?: () => void;
};

const Comments: React.FC<CommentsProps> = ({ data, showModal }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <Button variant="link" onClick={() => setIsVisible((prev) => !prev)}>
          Show Comments
        </Button>
        <Button variant="link" onClick={showModal}>
          Add Comment
        </Button>
      </div>
      {isVisible && data?.data != null && (
        <div className="my-4">
          {data.data.map((comment) => (
            <Card key={comment?.id} className="mb-3">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <strong>{comment?.name}</strong>
                  <a href={`mailto:${comment?.email}`}>{comment?.email}</a>
                </div>
                <p>{comment?.body}</p>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
