import { fireEvent, render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { post_post_comments_data } from 'graphql/__generated__/post';
import Comments from './Comments';

describe('Comments component', () => {
  const data: post_post_comments_data[] = [
    {
      __typename: 'Comment',
      id: '5',
      name: 'Test name',
      email: 'Test email',
      body: 'Test body',
    },
  ];

  const showModal = jest.fn();

  it('renders correctly', () => {
    const { container } = render(
      <Comments data={data} showModal={showModal} />
    );

    expect(container.innerHTML).toMatch('Show Comments');
    expect(container.innerHTML).toMatch('Add Comment');
  });

  it('renders comment correctly on "Show Comments" click', () => {
    const { container, getByText } = render(
      <Comments data={data} showModal={showModal} />
    );

    act(() => {
      fireEvent.click(getByText('Show Comments'));
    });

    expect(container.innerHTML).toMatch('Test name');
    expect(container.innerHTML).toMatch('Test body');
  });

  it('calls "showModal" function on "Add Comment" click', () => {
    const { getByText } = renderWithRouter(
      <Comments data={data} showModal={showModal} />
    );

    fireEvent.click(getByText('Add Comment'));
    expect(showModal).toHaveBeenCalled();
  });
});
