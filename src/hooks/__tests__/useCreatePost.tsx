import { MockedResponse } from '@apollo/client/testing';
import { renderHook, act } from '@testing-library/react-hooks';
import useCreatePost from '../useCreatePost';
import { CREATE_POST } from '../../graphql/mutations';
import { MockedWrapper } from '../../testHelpers';

describe('useCreatePost hook', () => {
  const createPostResult = {
    id: '101',
    title: 'Test post title text',
    body: 'Test post body text',
  };

  const createPostMock = [
    {
      request: {
        query: CREATE_POST,
        variables: {
          input: { title: 'Test post title text', body: 'Test post body text' },
        },
      },
      result: { data: createPostResult },
    },
  ];

  const getHookWrapper = (mocks: MockedResponse<Record<string, unknown>>[]) => {
    const { result, waitForNextUpdate } = renderHook(() => useCreatePost('5'), {
      wrapper: MockedWrapper,
      initialProps: {
        mocks,
      },
    });

    act(() => {
      result.current.handleCreatePost(
        createPostResult.title,
        createPostResult.body
      );
    });

    expect(result.current.loading).toBeTruthy();
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toBeUndefined();

    return { result, waitForNextUpdate };
  };

  it('allows you to create Post', async () => {
    const { result, waitForNextUpdate } = getHookWrapper(createPostMock);

    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toEqual({
      id: '101',
      title: 'Test post title text',
      body: 'Test post body text',
    });
  });
});
