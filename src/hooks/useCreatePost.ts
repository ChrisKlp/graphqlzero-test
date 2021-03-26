import { ApolloError, useMutation } from '@apollo/client';
import { CREATE_POST } from '../graphql/mutations';
import { USER_POSTS } from '../graphql/queries';
import {
  createPost,
  createPostVariables,
} from '../graphql/__generated__/createPost';
import {
  userPosts,
  userPostsVariables,
} from '../graphql/__generated__/userPosts';

type UseCreatePostReturn = {
  handleCreatePost: (title: string, body: string) => void;
  data: createPost | null | undefined;
  error: ApolloError | undefined;
  loading: boolean;
};

const useCreatePost = (userId: string): UseCreatePostReturn => {
  const [createPostMutation, { data, error, loading }] = useMutation<
    createPost,
    createPostVariables
  >(CREATE_POST);

  const handleCreatePost = (title: string, body: string) => {
    createPostMutation({
      variables: { input: { title, body } },
      optimisticResponse: {
        __typename: 'Mutation',
        createPost: {
          __typename: 'Post',
          id: null,
          title,
          body,
        },
      },
      update(cache, { data: addPostData }) {
        const userPostsCache = cache.readQuery<userPosts, userPostsVariables>({
          query: USER_POSTS,
          variables: {
            id: userId,
          },
        });

        if (userPostsCache && userPostsCache.user?.posts?.data) {
          cache.writeQuery({
            query: USER_POSTS,
            variables: {
              id: userId,
            },
            data: {
              user: {
                ...userPostsCache.user,
                posts: {
                  ...userPostsCache.user?.posts,
                  data: [
                    ...userPostsCache.user?.posts?.data,
                    addPostData?.createPost,
                  ],
                },
              },
            },
          });
        }
      },
    });
  };

  return { handleCreatePost, data, error, loading };
};

export default useCreatePost;
