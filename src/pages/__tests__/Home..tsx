import { MockedProvider } from '@apollo/client/testing';
import { waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { USERS } from 'graphql/queries';
import Home from 'pages/Home';

describe('Home Component', () => {
  const usersQueryResult = {
    users: {
      data: [
        {
          id: '1',
          name: 'Ervin Howell',
          email: 'Shanna@melissa.tv',
          phone: '010-692-6593 x09125',
          website: 'anastasia.net',
          company: {
            name: 'Deckow-Crist',
            catchPhrase: 'Proactive didactic',
            bs: 'contingency',
          },
        },
      ],
    },
  };

  const resultMocks = [
    {
      request: {
        query: USERS,
      },
      result: { data: usersQueryResult },
    },
  ];

  const errorMocks = [
    {
      request: {
        query: USERS,
      },
      error: new Error('An error occurred'),
    },
  ];

  it('renders correctly', async () => {
    const { getByText, getByTestId } = renderWithRouter(
      <MockedProvider mocks={resultMocks} addTypename={false}>
        <Home />
      </MockedProvider>,
      '/'
    );

    expect(getByTestId('loading')).toBeInTheDocument();

    await waitFor(() => {
      expect(getByText('Ervin Howell')).toBeInTheDocument();
      expect(getByText('Shanna@melissa.tv')).toBeInTheDocument();
      expect(getByText('Proactive didactic')).toBeInTheDocument();
    });
  });

  it('should switch on error route when request fails', async () => {
    const { history } = renderWithRouter(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <Home />
      </MockedProvider>,
      '/'
    );

    await waitFor(() => {
      expect(history.location.pathname).toBe('/network-error');
    });
  });

  it('should switch on user page on "details button" click', async () => {
    const { getByText, history } = renderWithRouter(
      <MockedProvider mocks={resultMocks} addTypename={false}>
        <Home />
      </MockedProvider>,
      '/'
    );

    await waitFor(() => {
      userEvent.click(getByText('Details'));
      expect(history.location.pathname).toBe('/user/1');
    });
  });
});
