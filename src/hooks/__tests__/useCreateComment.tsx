import { MockedProvider } from '@apollo/client/testing';
import { renderHook, act } from '@testing-library/react-hooks';
import useCreateComment from '../useCreateComment';
import { CREATE_COMMENT } from '../../graphql/mutations';

describe('useCreateComment hook', () => {
  const createCommentResult = {
    id: '101',
    name: 'Test name',
    email: 'test@email.com',
    body: 'Test post body text',
  };

  const createCommentMock = [
    {
      request: {
        query: CREATE_COMMENT,
        variables: {
          input: {
            name: createCommentResult.name,
            email: createCommentResult.email,
            body: createCommentResult.body,
          },
        },
      },
      result: { data: createCommentResult },
    },
  ];

  const getHookWrapper = (mocks: typeof createCommentMock) => {
    const wrapper: React.FC = ({ children }) => (
      <MockedProvider mocks={mocks} addTypename={false}>
        {children}
      </MockedProvider>
    );

    const { result, waitForNextUpdate } = renderHook(
      () => useCreateComment('5'),
      {
        wrapper,
      }
    );

    act(() => {
      result.current.handleCreateComment(
        createCommentResult.name,
        createCommentResult.email,
        createCommentResult.body
      );
    });

    expect(result.current.loading).toBeTruthy();
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toBeUndefined();

    return { result, waitForNextUpdate };
  };

  it('allows you to create Post', async () => {
    const { result, waitForNextUpdate } = getHookWrapper(createCommentMock);

    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toEqual({
      id: '101',
      name: 'Test name',
      email: 'test@email.com',
      body: 'Test post body text',
    });
  });
});
