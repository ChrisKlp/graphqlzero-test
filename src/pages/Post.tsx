import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Navigation, PostComponent } from '../components';
import { POST } from '../graphql/queries';
import { PostQuery, PostVariables } from '../graphql/types/Post';

const Post: React.FC = () => {
  const { id }: { id: string } = useParams();

  const { data, loading, error } = useQuery<PostQuery, PostVariables>(POST, {
    variables: {
      id,
    },
  });

  if (loading) {
    return <p>...loading</p>;
  }

  if (error) {
    return <p>Opps... {error.message}</p>;
  }

  return (
    <div>
      <Navigation name={data?.post.user.name} />
      {data && <PostComponent data={data?.post} />}
    </div>
  );
};

export default Post;
