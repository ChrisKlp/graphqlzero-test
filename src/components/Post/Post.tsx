import { post_post } from '../../graphql/__generated__/post';

type PostProps = {
  data: post_post | null | undefined;
};

const Post: React.FC<PostProps> = ({ data }) => {
  return (
    <div className="my-5">
      <h1 className="mb-5">{data?.title}</h1>
      <p>{data?.body}</p>
    </div>
  );
};

export default Post;
