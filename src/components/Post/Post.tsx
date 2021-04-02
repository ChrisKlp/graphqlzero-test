import { post_post } from 'graphql/__generated__/post';

type PostProps = {
  data: post_post;
};

const Post: React.FC<PostProps> = ({ data }) => {
  const { title, body } = data;
  return (
    <div className="my-5">
      <h1 className="mb-5">{title}</h1>
      <p>{body}</p>
    </div>
  );
};

export default Post;
