// type UserProps = {};
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Navigation, PostListItem } from '../components';
import { USER_POSTS } from '../graphql/queries';
import { UserPostsQuery, UserPostsVariables } from '../graphql/types/UserPosts';

const User: React.FC = () => {
  const { id }: { id: string } = useParams();

  const { data, loading, error } = useQuery<UserPostsQuery, UserPostsVariables>(
    USER_POSTS,
    {
      variables: {
        id,
      },
    }
  );

  if (loading) {
    return <p>...loading</p>;
  }

  if (error) {
    return <p>Opps... {error.message}</p>;
  }

  return (
    <div>
      <Navigation name={data?.user.name} />
      {data?.user.posts.data.map((post) => (
        <PostListItem key={post.id} data={post} />
      ))}
    </div>
  );
};

export default User;
