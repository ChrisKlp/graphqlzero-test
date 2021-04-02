import { useCallback, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useHistory, useParams } from 'react-router-dom';
import {
  Comments,
  ModalForm,
  Navigation,
  PostComponent,
  PostComponentSkeleton,
} from 'components';
import { POST } from 'graphql/queries';
import { post, postVariables } from 'graphql/__generated__/post';
import useCreateComment from 'hooks/useCreateComment';
import useDeletePost from 'hooks/useDeletePost';
import useModal from 'hooks/useModal';
import routes from 'routes';

const Post: React.FC = () => {
  const { id }: { id: string } = useParams();
  const history = useHistory();
  const handleModal = useModal();
  const { handleDeletePost, error: deletePostError } = useDeletePost();

  const { handleCreateComment, error: createCommentError } = useCreateComment(
    id
  );

  const deletePost = useCallback(() => {
    handleDeletePost(id);
    history.goBack();
  }, [handleDeletePost, history, id]);

  const { data, loading, error } = useQuery<post, postVariables>(POST, {
    variables: { id },
  });

  useEffect(() => {
    if (error || createCommentError || deletePostError) {
      history.push({
        pathname: routes.error,
        state: {
          error: { ...error } || { ...createCommentError } || {
              ...deletePostError,
            },
        },
      });
    }
  }, [error, createCommentError, deletePostError, history]);

  return (
    <>
      <Navigation name={data?.post?.user?.name} deletePost={deletePost} />
      {loading ? (
        <PostComponentSkeleton />
      ) : (
        <>
          {data?.post && <PostComponent data={data.post} />}
          <hr />
          {data?.post?.comments?.data && (
            <Comments
              data={data.post.comments.data}
              showModal={handleModal.showModal}
            />
          )}
        </>
      )}
      <ModalForm
        handleModal={handleModal}
        comments
        createComment={handleCreateComment}
      />
    </>
  );
};

export default Post;
