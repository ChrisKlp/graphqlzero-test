import { useQuery } from '@apollo/client';
import { ListGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ModalForm, Navigation, PostListItem } from '../components';
import { USER_POSTS } from '../graphql/queries';

import {
  userPosts,
  userPostsVariables,
} from '../graphql/__generated__/userPosts';
import useCreatePost from '../hooks/useCreatePost';
import useDeletePost from '../hooks/useDeletePost';
import useModal from '../hooks/useModal';

const User: React.FC = () => {
  const { id }: { id: string } = useParams();
  const handleModal = useModal();
  const handleDeletePost = useDeletePost();
  const handleCreatePost = useCreatePost(id);

  const { data, loading, error } = useQuery<userPosts, userPostsVariables>(
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
      <Navigation name={data?.user?.name} showModal={handleModal.showModal} />
      <ListGroup>
        {data?.user?.posts?.data != null &&
          data?.user?.posts?.data.map((post) => (
            <>
              {post != null && (
                <PostListItem
                  key={post!.id}
                  data={post}
                  deletePost={handleDeletePost}
                />
              )}
            </>
          ))}
      </ListGroup>
      <ModalForm handleModal={handleModal} createPost={handleCreatePost} />
    </>
  );
};

export default User;
