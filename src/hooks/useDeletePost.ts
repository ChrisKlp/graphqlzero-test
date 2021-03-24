import { useMutation } from '@apollo/client';
import { DELETE_POST } from '../graphql/mutations';
import {
  deletePost,
  deletePostVariables,
} from '../graphql/__generated__/deletePost';

const useDeletePost = (): ((id: string) => void) => {
  const [deletePostMutation] = useMutation<deletePost, deletePostVariables>(
    DELETE_POST
  );

  const handleDeletePost = (id: string) => {
    deletePostMutation({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        deletePost: true,
      },
      update(cache) {
        cache.evict({
          id: cache.identify({
            __typename: 'Post',
            id,
          }),
        });
      },
    });
  };
  return handleDeletePost;
};

export default useDeletePost;
