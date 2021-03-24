import { useMutation } from '@apollo/client';
import { CREATE_COMMENT } from '../graphql/mutations';
import { POST } from '../graphql/queries';
import {
  createComment,
  createCommentVariables,
} from '../graphql/__generated__/createComment';
import { post, postVariables } from '../graphql/__generated__/post';

const useCreateComment = (
  postId: string
): ((name: string, email: string, body: string) => void) => {
  const [createPostMutation] = useMutation<
    createComment,
    createCommentVariables
  >(CREATE_COMMENT);

  const handleCreateComment = (name: string, email: string, body: string) => {
    createPostMutation({
      variables: { input: { name, email, body } },
      optimisticResponse: {
        __typename: 'Mutation',
        createComment: {
          __typename: 'Comment',
          id: null,
          name,
          email,
          body,
        },
      },
      update(cache, { data: addCommentData }) {
        const postCache = cache.readQuery<post, postVariables>({
          query: POST,
          variables: {
            id: postId,
          },
        });

        if (postCache && postCache.post?.comments?.data) {
          cache.writeQuery({
            query: POST,
            variables: {
              id: postId,
            },
            data: {
              post: {
                ...postCache.post,
                comments: {
                  ...postCache.post?.comments,
                  data: [
                    ...postCache.post?.comments?.data,
                    addCommentData?.createComment,
                  ],
                },
              },
            },
          });
        }
      },
    });
  };

  return handleCreateComment;
};

export default useCreateComment;
