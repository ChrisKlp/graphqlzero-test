import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Comments, ModalForm, Navigation, PostComponent } from '../components';
import { POST } from '../graphql/queries';
import { PostQuery, PostVariables } from '../graphql/types/Post';
import useModal from '../hooks/useModal';

const Post: React.FC = () => {
  const { id }: { id: string } = useParams();
  const handleModal = useModal();

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
    <>
      <Navigation name={data?.post.user.name} />
      {data && (
        <>
          <PostComponent data={data?.post} />
          <hr />
          <Comments
            data={data?.post.comments}
            showModal={handleModal.showModal}
          />
        </>
      )}
      <ModalForm handleModal={handleModal} comments />
    </>
  );
};

export default Post;
