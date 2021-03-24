import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { UseModalType } from '../../hooks/useModal';

type ModalFormProps = {
  handleModal: UseModalType;
  comments?: boolean;
  createPost?: (title: string, body: string) => void;
  createComment?: (name: string, email: string, body: string) => void;
};

type Inputs = {
  name: string;
  email: string;
  title: string;
  body: string;
};

const ModalForm: React.FC<ModalFormProps> = ({
  handleModal,
  comments,
  createPost,
  createComment,
}) => {
  const validationSchema = Yup.object().shape(
    comments
      ? {
          name: Yup.string()
            .required('Field is required')
            .min(3, 'Use at least 3 characters')
            .max(30, 'Use maximum 30 characters'),
          email: Yup.string()
            .required('Field is required')
            .email('Please use a valid email address'),
          body: Yup.string()
            .required('Field is required')
            .min(10, 'Use at least 10 characters'),
        }
      : {
          title: Yup.string()
            .required('Field is required')
            .min(10, 'Use at least 10 characters')
            .max(150, 'Use maximum 150 characters'),
          body: Yup.string()
            .required('Field is required')
            .min(10, 'Use at least 10 characters'),
        }
  );

  const { register, handleSubmit, errors, reset } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
  });

  const onCancel = () => {
    handleModal.closeModal();
    reset();
  };

  const onSubmit = (data: Inputs) => {
    if (!comments && createPost) {
      createPost(data.title, data.body);
    }

    if (comments && createComment) {
      createComment(data.name, data.email, data.body);
    }

    handleModal.closeModal();
    onCancel();
  };

  return (
    <Modal
      centered
      show={handleModal.isVisible}
      onHide={handleModal.closeModal}
      size="lg"
    >
      <Modal.Header closeButton={false}>
        <h4 className="m-4">Add {comments ? 'Comment' : 'Post'}</h4>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Modal.Body className="m-4">
          {comments ? (
            <>
              <Form.Group>
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  isInvalid={!!errors?.name}
                  ref={register}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.name?.message}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  isInvalid={!!errors?.email}
                  ref={register}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </>
          ) : (
            <Form.Group>
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                name="title"
                isInvalid={!!errors?.title}
                ref={register}
              />
              <Form.Control.Feedback type="invalid">
                {errors.title?.message}
              </Form.Control.Feedback>
            </Form.Group>
          )}
          <Form.Group>
            <Form.Label>Body:</Form.Label>
            <Form.Control
              as="textarea"
              rows={comments ? 3 : 8}
              name="body"
              isInvalid={!!errors?.body}
              ref={register}
            />
            <Form.Control.Feedback type="invalid">
              {errors.body?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCancel}>
            Close
          </Button>
          <Button variant="warning" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalForm;
