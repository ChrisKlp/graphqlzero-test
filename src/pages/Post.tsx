import { useQuery } from '@apollo/client';
import { Redirect, useParams } from 'react-router-dom';
import {
  Comments,
  ModalForm,
  Navigation,
  PostComponent,
  PostComponentSkeleton,
} from '../components';
import { POST } from '../graphql/queries';
import { post, postVariables } from '../graphql/__generated__/post';
import useCreateComment from '../hooks/useCreateComment';
import useModal from '../hooks/useModal';

const Post: React.FC = () => {
  const { id }: { id: string } = useParams();
  const handleModal = useModal();
  const {
    handleCreateComment,
    error: createCommentError,
    loading: createCommentLoading,
  } = useCreateComment(id);

  const { data, loading, error } = useQuery<post, postVariables>(POST, {
    variables: { id },
  });

  if (error || createCommentError)
    return (
      <Redirect
        to={{
          pathname: '/network-error',
          state: {
            error: { ...error } || { ...createCommentError },
          },
        }}
      />
    );

  return (
    <>
      <Navigation name={data?.post?.user?.name} />
      {loading || createCommentLoading ? (
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
