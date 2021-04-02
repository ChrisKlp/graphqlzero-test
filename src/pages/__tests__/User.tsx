import { MockedProvider } from '@apollo/client/testing';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { USER_POSTS } from 'graphql/queries';
import User from 'pages/User';

describe('User comppnent', () => {
  const userPostsQueryResult = {
    user: {
      id: '1',
      name: 'Ervin Howell',
      posts: {
        data: [{ id: '1', title: 'Test title' }],
      },
    },
  };

  const resultMocks = [
    {
      request: {
        query: USER_POSTS,
        variables: {
          id: '1',
        },
      },
      result: { data: userPostsQueryResult },
    },
  ];

  const errorMocks = [
    {
      request: {
        query: USER_POSTS,
      },
      error: new Error('An error occurred'),
    },
  ];
  it('renders correctly', () => {
    const { getByTestId, getByText } = renderWithRouter(
      <MockedProvider mocks={resultMocks} addTypename={false}>
        <User />
      </MockedProvider>,
      '/user/1'
    );

    expect(getByTestId('loading')).toBeInTheDocument();
    expect(getByText('Back')).toBeInTheDocument();

    waitFor(() => {
      expect(getByText('Test title')).toBeInTheDocument();
      expect(getByText('Ervin Howell')).toBeInTheDocument();
    });
  });

  it('should switch on error route when request fails', () => {
    const { history } = renderWithRouter(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <User />
      </MockedProvider>,
      '/user/1'
    );

    waitFor(() => {
      expect(history.location.pathname).toBe('/network-error');
    });
  });

  it('should switch on post page on "post arrow" click', () => {
    const { history, getByTestId } = renderWithRouter(
      <MockedProvider mocks={resultMocks} addTypename={false}>
        <User />
      </MockedProvider>,
      '/user/1'
    );

    waitFor(() => {
      userEvent.click(getByTestId('postlink'));
      expect(history.location.pathname).toBe('/post/1');
    });
  });
});
