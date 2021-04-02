import { MockedProvider } from '@apollo/client/testing';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { POST } from 'graphql/queries';
import Post from 'pages/Post';

describe('Post comppnent', () => {
  const postQueryResult = {
    post: {
      id: '1',
      title: 'Post test title',
      body: 'Post test body text',
      user: {
        id: '1',
        name: 'Ervin Howell',
      },
      comments: {
        data: [
          {
            id: '1',
            name: 'test name',
            email: 'test@mail.com',
            body: 'Comment test body text',
          },
        ],
      },
    },
  };

  const resultMocks = [
    {
      request: {
        query: POST,
        variables: {
          id: '1',
        },
      },
      result: { data: postQueryResult },
    },
  ];

  const errorMocks = [
    {
      request: {
        query: POST,
      },
      error: new Error('An error occurred'),
    },
  ];
  it('renders correctly', () => {
    const { getByTestId, getByText } = renderWithRouter(
      <MockedProvider mocks={resultMocks} addTypename={false}>
        <Post />
      </MockedProvider>,
      '/post/1'
    );

    expect(getByTestId('loading')).toBeInTheDocument();

    waitFor(() => {
      expect(getByText('Show Comments')).toBeInTheDocument();
      expect(getByText('Post test title')).toBeInTheDocument();
      expect(getByText('Post test body text')).toBeInTheDocument();
    });
  });

  it('should switch on error route when request fails', () => {
    const { history } = renderWithRouter(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <Post />
      </MockedProvider>,
      '/post/1'
    );

    waitFor(() => {
      expect(history.location.pathname).toBe('/network-error');
    });
  });

  it('renders comment correctly on "Show Comments" click', () => {
    const { getByText } = renderWithRouter(
      <MockedProvider mocks={resultMocks} addTypename={false}>
        <Post />
      </MockedProvider>,
      '/post/1'
    );

    waitFor(() => {
      userEvent.click(getByText('Show Comments'));
      expect(getByText('test name')).toBeInTheDocument();
      expect(getByText('test@mail.com')).toBeInTheDocument();
      expect(getByText('Comment test body text')).toBeInTheDocument();
    });
  });
});
