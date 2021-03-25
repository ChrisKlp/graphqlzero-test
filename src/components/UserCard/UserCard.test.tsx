import { users_users_data } from '../../graphql/__generated__/users';
import UserCard from './UserCard';

describe('UserCard component', () => {
  const data: users_users_data = {
    __typename: 'User',
    id: '1',
    name: 'Test Name',
    email: 'Test email',
    phone: '987 654 321',
    website: 'www.test.com',
    company: {
      __typename: 'Company',
      name: 'Test company name',
      bs: 'Test bs',
      catchPhrase: 'Test catch phrase',
    },
  };

  it('renders correctly', () => {
    const { container } = renderWithRouter(<UserCard data={data} />);

    expect(container.innerHTML).toMatch('Test Name');
    expect(container.innerHTML).toMatch('Test email');
    expect(container.innerHTML).toMatch('Test company name');
  });

  it('renders link correctly', () => {
    const { getByText } = renderWithRouter(<UserCard data={data} />);

    expect(getByText('Details').closest('a')).toHaveAttribute(
      'href',
      '/user/1'
    );
  });
});
