import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import {
  Comments,
  Error,
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
  const handleCreateComment = useCreateComment(id);

  const { data, loading, error } = useQuery<post, postVariables>(POST, {
    variables: { id },
  });

  if (error) return <Error error={error} />;

  return (
    <>
      <Navigation name={data?.post?.user?.name} />
      {loading ? (
        <PostComponentSkeleton />
      ) : (
        <>
          <PostComponent data={data?.post} />
          <hr />
          {data?.post?.comments?.data != null && (
            <Comments
              data={data?.post.comments.data}
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
