import { fireEvent } from '@testing-library/react';
import { userPosts_user_posts_data } from 'graphql/__generated__/userPosts';
import PostListItem from './PostListItem';

describe('PostListItem component', () => {
  const data: userPosts_user_posts_data = {
    __typename: 'Post',
    id: '1',
    title: 'Test title',
  };

  const handleDeletePost = jest.fn();

  it('renders title correctly', () => {
    const { container } = renderWithRouter(
      <PostListItem data={data} handleDeletePost={handleDeletePost} />
    );

    expect(container.innerHTML).toMatch('Test title');
  });

  it('renders link correctly', () => {
    const { getByRole } = renderWithRouter(
      <PostListItem data={data} handleDeletePost={handleDeletePost} />
    );

    expect(getByRole('link')).toHaveAttribute('href', '/post/1');
  });

  it('calls "deletePost" function on "delete icon" click', () => {
    const { getByRole } = renderWithRouter(
      <PostListItem data={data} handleDeletePost={handleDeletePost} />
    );

    fireEvent.click(getByRole('button'));
    expect(handleDeletePost).toBeCalledWith(data.id);
  });
});
