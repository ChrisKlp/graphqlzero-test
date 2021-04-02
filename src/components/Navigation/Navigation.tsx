import {
  faChevronLeft,
  faPlus,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/ban-types
type NavigationProps = {
  name?: string | null;
  showModal?: () => void;
  deletePost?: () => void;
};

const Navigation: React.FC<NavigationProps> = ({
  name,
  showModal,
  deletePost,
}) => {
  const history = useHistory();
  const isUserPage = /\/user\/.*/.test(history.location.pathname);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <Button variant="link" onClick={() => history.goBack()}>
          <FontAwesomeIcon icon={faChevronLeft} /> Back
        </Button>
        {name ? <h4>{name}</h4> : <div className="skeleton__nav-name" />}
        <div>
          {isUserPage ? (
            <Button variant="warning" onClick={showModal} data-testid="add">
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          ) : (
            <Button variant="danger" onClick={deletePost} data-testid="add">
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          )}
        </div>
      </div>
      <hr />
    </>
  );
};

export default Navigation;
