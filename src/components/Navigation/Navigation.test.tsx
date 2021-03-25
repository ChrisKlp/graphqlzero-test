import { fireEvent } from '@testing-library/react';
import Navigation from './Navigation';

describe('Navigation component', () => {
  const name = 'John Doe';
  const showModal = jest.fn();

  it('renders correctly', () => {
    const { container } = renderWithRouter(
      <Navigation name={name} showModal={showModal} />
    );

    expect(container.innerHTML).toMatch('John Doe');
  });

  describe('on Post page', () => {
    it('should go back to User page on "back button" click', () => {
      const { getByText, history } = renderWithRouter(
        <Navigation name={name} showModal={showModal} />
      );

      history.push('/user/1');
      history.push('/post/1');

      fireEvent.click(getByText('Back'));
      expect(history.location.pathname).toBe('/user/1');
    });
  });

  describe('on User page', () => {
    it('renders "add button" correctly', () => {
      const { getByTestId } = renderWithRouter(
        <Navigation name={name} showModal={showModal} />,
        '/user/1'
      );

      expect(getByTestId('add')).toBeInTheDocument();
    });

    it('calls "showModal" function on "add button" click', () => {
      const { getByTestId } = renderWithRouter(
        <Navigation name={name} showModal={showModal} />,
        '/user/1'
      );

      fireEvent.click(getByTestId('add'));
      expect(showModal).toHaveBeenCalled();
    });
  });
});
