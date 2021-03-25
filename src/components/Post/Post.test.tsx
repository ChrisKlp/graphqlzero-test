import { render } from '@testing-library/react';
import { post_post } from '../../graphql/__generated__/post';
import Post from './Post';

describe('Post component', () => {
  const data: post_post = {
    __typename: 'Post',
    id: '5',
    title: 'Test title',
    body: 'Test body',
    user: null,
    comments: null,
  };

  it('renders correctly', () => {
    const { container } = render(<Post data={data} />);

    expect(container.innerHTML).toMatch('Test title');
    expect(container.innerHTML).toMatch('Test body');
  });
});
