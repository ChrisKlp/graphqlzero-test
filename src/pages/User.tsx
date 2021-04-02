import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { ListGroup } from 'react-bootstrap';
import { useParams, useHistory } from 'react-router-dom';
import {
  ModalForm,
  Navigation,
  PostListItem,
  PostListItemSkeleton,
} from 'components';
import { USER_POSTS } from 'graphql/queries';

import { userPosts, userPostsVariables } from 'graphql/__generated__/userPosts';
import useCreatePost from 'hooks/useCreatePost';
import useDeletePost from 'hooks/useDeletePost';
import useModal from 'hooks/useModal';
import generateArray from 'utils/generateArray';
import routes from 'routes';

const User: React.FC = () => {
  const { id }: { id: string } = useParams();
  const handleModal = useModal();
  const { handleDeletePost, error: deletePostError } = useDeletePost();
  const { handleCreatePost, error: createPostError } = useCreatePost(id);
  const history = useHistory();

  const { data, loading, error } = useQuery<userPosts, userPostsVariables>(
    USER_POSTS,
    {
      variables: {
        id,
      },
    }
  );

  useEffect(() => {
    if (error || deletePostError || createPostError) {
      history.push({
        pathname: routes.error,
        state: {
          error: { ...error } || { ...deletePostError } || {
              ...createPostError,
            },
        },
      });
    }
  }, [error, deletePostError, createPostError, history]);

  const loadingPosts = generateArray(12).map((_, index) => (
    <PostListItemSkeleton key={index} />
  ));

  return (
    <>
      <Navigation name={data?.user?.name} showModal={handleModal.showModal} />
      <ListGroup>
        {loading ? (
          <div data-testid="loading">{loadingPosts}</div>
        ) : (
          data?.user?.posts?.data &&
          data?.user?.posts?.data.map(
            (post) =>
              post && (
                <PostListItem
                  key={post.id}
                  data={post}
                  handleDeletePost={handleDeletePost}
                />
              )
          )
        )}
      </ListGroup>
      <ModalForm handleModal={handleModal} createPost={handleCreatePost} />
    </>
  );
};

export default User;
