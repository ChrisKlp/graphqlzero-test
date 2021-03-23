import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { UseModalType } from '../../hooks/useModal';

type ModalFormProps = {
  handleModal: UseModalType;
  comments?: boolean;
};

type Inputs = {
  name: string;
  email: string;
  title: string;
  body: string;
};

const ModalForm: React.FC<ModalFormProps> = ({ handleModal, comments }) => {
  const { register, handleSubmit, errors } = useForm<Inputs>();
  const onSubmit = (data: Inputs) => console.log(data);

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
                  ref={register({
                    required: { value: true, message: 'Field is required' },
                    maxLength: {
                      value: 30,
                      message: 'use maximum 30 characters',
                    },
                    minLength: {
                      value: 3,
                      message: 'use at least 3 characters',
                    },
                  })}
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
                  ref={register({
                    required: { value: true, message: 'Field is required' },
                    pattern: {
                      value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: 'Input valid email',
                    },
                  })}
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
                ref={register({
                  required: { value: true, message: 'Field is required' },
                  maxLength: {
                    value: 150,
                    message: 'use maximum 150 characters',
                  },
                  minLength: {
                    value: 10,
                    message: 'use at least 10 characters',
                  },
                })}
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
              ref={register({
                required: { value: true, message: 'Field is required' },
                minLength: {
                  value: 10,
                  message: 'use at least 10 characters',
                },
              })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.body?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModal.closeModal}>
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
