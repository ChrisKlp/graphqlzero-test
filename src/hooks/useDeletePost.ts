import { ApolloError, useMutation } from '@apollo/client';
import { DELETE_POST } from '../graphql/mutations';
import {
  deletePost,
  deletePostVariables,
} from '../graphql/__generated__/deletePost';

type UseDeletePostReturn = {
  handleDeletePost: (id: string) => void;
  data: deletePost | null | undefined;
  error: ApolloError | undefined;
  loading: boolean;
};

const useDeletePost = (): UseDeletePostReturn => {
  const [deletePostMutation, { data, error, loading }] = useMutation<
    deletePost,
    deletePostVariables
  >(DELETE_POST);

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
  return { handleDeletePost, data, error, loading };
};

export default useDeletePost;
