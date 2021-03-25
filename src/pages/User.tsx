import { useQuery } from '@apollo/client';
import { ListGroup } from 'react-bootstrap';
import { Redirect, useParams } from 'react-router-dom';
import {
  ModalForm,
  Navigation,
  PostListItem,
  PostListItemSkeleton,
} from '../components';
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

  const loadingPosts = [];

  for (let i = 0; i < 12; i += 1) {
    loadingPosts.push(<PostListItemSkeleton key={i} />);
  }

  if (error)
    return <Redirect to={{ pathname: '/network-error', state: { error } }} />;

  return (
    <>
      <Navigation name={data?.user?.name} showModal={handleModal.showModal} />
      <ListGroup>
        {loading
          ? loadingPosts
          : data?.user?.posts?.data &&
            data?.user?.posts?.data.map(
              (post) =>
                post && (
                  <PostListItem
                    key={post.id}
                    data={post}
                    deletePost={handleDeletePost}
                  />
                )
            )}
      </ListGroup>
      <ModalForm handleModal={handleModal} createPost={handleCreatePost} />
    </>
  );
};

export default User;
