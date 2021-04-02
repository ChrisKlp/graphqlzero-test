import { MockedResponse } from '@apollo/client/testing';
import { renderHook, act } from '@testing-library/react-hooks';
import useDeletePost from '../useDeletePost';
import { DELETE_POST } from '../../graphql/mutations';
import { MockedWrapper } from '../../testHelpers';

describe('useDeletePost hook', () => {
  const deletePostResult = { deletePost: true };
  const id = '1';
  const deletePostMock = [
    {
      request: {
        query: DELETE_POST,
        variables: { id },
      },
      result: { data: deletePostResult },
    },
  ];

  const getHookWrapper = (mocks: MockedResponse<Record<string, unknown>>[]) => {
    const { result, waitForNextUpdate } = renderHook(() => useDeletePost(), {
      wrapper: MockedWrapper,
      initialProps: {
        mocks,
      },
    });

    act(() => {
      result.current.handleDeletePost(id);
    });

    expect(result.current.loading).toBeTruthy();
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toBeUndefined();

    return { result, waitForNextUpdate };
  };

  it('allows you to delete Post', async () => {
    const { result, waitForNextUpdate } = getHookWrapper(deletePostMock);

    await waitForNextUpdate();

    expect(result.current.loading).toBeFalsy();
    expect(result.current.error).toBeUndefined();
    expect(result.current.data).toEqual({
      deletePost: true,
    });
  });
});
