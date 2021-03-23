import { PostData } from '../../graphql/types/Post';

type PostProps = {
  data: PostData;
};

const Post: React.FC<PostProps> = ({ data }) => {
  return (
    <div className="my-5">
      <h1 className="mb-5">{data.title}</h1>
      <p>{data.body}</p>
    </div>
  );
};

export default Post;
