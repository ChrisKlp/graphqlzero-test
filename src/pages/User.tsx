// type UserProps = {};
import { useQuery } from '@apollo/client';
import { ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ModalForm, Navigation, PostListItem } from '../components';
import { USER_POSTS } from '../graphql/queries';
import { UserPostsQuery, UserPostsVariables } from '../graphql/types/UserPosts';
import useModal from '../hooks/useModal';

const User: React.FC = () => {
  const { id }: { id: string } = useParams();
  const handleModal = useModal();

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
    <>
      <Navigation name={data?.user.name} showModal={handleModal.showModal} />
      <ListGroup>
        {data?.user.posts.data.map((post) => (
          <PostListItem key={post.id} data={post} />
        ))}
      </ListGroup>
      <ModalForm handleModal={handleModal} />
    </>
  );
};

export default User;
