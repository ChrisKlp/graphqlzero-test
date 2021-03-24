import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Comments, ModalForm, Navigation, PostComponent } from '../components';
import { POST } from '../graphql/queries';
import { post, postVariables } from '../graphql/__generated__/post';
import useCreateComment from '../hooks/useCreateComment';
import useModal from '../hooks/useModal';

const Post: React.FC = () => {
  const { id }: { id: string } = useParams();
  const handleModal = useModal();
  const handleCreateComment = useCreateComment(id);

  const { data, loading, error } = useQuery<post, postVariables>(POST, {
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
    <>
      {data?.post != null && data.post.user != null && (
        <>
          <Navigation name={data?.post.user.name} />
          <PostComponent data={data?.post} />
          <hr />
          <Comments
            data={data?.post.comments}
            showModal={handleModal.showModal}
          />
          <ModalForm
            handleModal={handleModal}
            comments
            createComment={handleCreateComment}
          />
        </>
      )}
    </>
  );
};

export default Post;
