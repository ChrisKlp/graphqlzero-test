import { createLocation, createMemoryHistory } from 'history';
import { ApolloError } from '@apollo/client';
import { render } from '@testing-library/react';
import NetworkError, { Props } from '../NetworkError';

describe('NetworkError component', () => {
  const errorState = {
    error: {
      message: 'Error Message!',
    } as ApolloError,
  };

  const props: Props = {
    history: createMemoryHistory(),
    location: createLocation('/network-error', errorState),
    match: {} as never,
  };

  it('should display error message', () => {
    const { getByText } = render(<NetworkError {...props} />);

    expect(getByText('Opps... Error Message!')).toBeInTheDocument();
  });

  it('renders "Try Again" button correctly', () => {
    const { getByText } = render(<NetworkError {...props} />);

    expect(getByText('Try Again').closest('a')).toHaveAttribute('href', '/');
  });
});
