import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ModalForm from './ModalForm';

describe('ModalForm component', () => {
  const handleModal = {
    isVisible: true,
    closeModal: jest.fn(),
    showModal: jest.fn(),
  };

  describe('on User page', () => {
    const createPost = jest.fn();

    it('renders correctly', () => {
      renderWithRouter(<ModalForm handleModal={handleModal} />, '/user/1');

      const title = screen.getByText(/title/i);
      const body = screen.getByText(/body/i);
      const addPost = screen.getByText(/add post/i);

      expect(title).toBeInTheDocument();
      expect(body).toBeInTheDocument();
      expect(addPost).toBeInTheDocument();
    });

    it('calls createPost function on "Save" button click', async () => {
      const { getByText, getByLabelText } = renderWithRouter(
        <ModalForm handleModal={handleModal} createPost={createPost} />,
        '/user/1'
      );

      await act(async () => {
        userEvent.type(getByLabelText(/title/i), 'Input test title');
        userEvent.type(getByLabelText(/body/i), 'textarea test body');
      });

      await act(async () => {
        userEvent.click(getByText('Save'));
      });

      expect(createPost).toHaveBeenCalledWith(
        'Input test title',
        'textarea test body'
      );
    });

    it('display error messages after submit a form', async () => {
      const { getByText, getByLabelText } = renderWithRouter(
        <ModalForm handleModal={handleModal} />,
        '/user/1'
      );

      await act(async () => {
        userEvent.type(getByLabelText(/title/i), 'Input');
      });

      await act(async () => {
        userEvent.click(getByText('Save'));
      });

      expect(getByText('Field is required')).toBeInTheDocument();
      expect(getByText('Use at least 10 characters')).toBeInTheDocument();
    });
  });

  describe('on Post page', () => {
    const createComment = jest.fn();

    it('renders correctly on Post page', () => {
      renderWithRouter(
        <ModalForm handleModal={handleModal} comments />,
        '/post/1'
      );

      const name = screen.getByText(/name/i);
      const email = screen.getByText(/email/i);
      const body = screen.getByText(/body/i);
      const addComment = screen.getByText(/add comment/i);

      expect(name).toBeInTheDocument();
      expect(email).toBeInTheDocument();
      expect(body).toBeInTheDocument();
      expect(addComment).toBeInTheDocument();
    });

    it('calls createComment function on "Save" button click', async () => {
      const { getByText, getByLabelText } = renderWithRouter(
        <ModalForm
          handleModal={handleModal}
          createComment={createComment}
          comments
        />,
        '/post/1'
      );

      await act(async () => {
        userEvent.type(getByLabelText(/name/i), 'test name');
        userEvent.type(getByLabelText(/email/i), 'test@email.com');
        userEvent.type(getByLabelText(/body/i), 'textarea test body');
      });

      await act(async () => {
        userEvent.click(getByText('Save'));
      });

      expect(createComment).toHaveBeenCalledWith(
        'test name',
        'test@email.com',
        'textarea test body'
      );
    });

    it('display error messages after submit a form', async () => {
      const { getByText, getByLabelText } = renderWithRouter(
        <ModalForm handleModal={handleModal} comments />,
        '/user/1'
      );

      await act(async () => {
        userEvent.type(
          getByLabelText(/name/i),
          'Very long name and long second name'
        );
        userEvent.type(getByLabelText(/email/i), 'mail@com');
      });

      await act(async () => {
        userEvent.click(getByText('Save'));
      });

      expect(getByText('Field is required')).toBeInTheDocument();
      expect(getByText('Use maximum 30 characters')).toBeInTheDocument();
      expect(getByText('Please use a valid email address')).toBeInTheDocument();
    });
  });
});
