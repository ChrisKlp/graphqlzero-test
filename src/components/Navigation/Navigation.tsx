import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/ban-types
type NavigationProps = {
  name: string | undefined;
};

const Navigation: React.FC<NavigationProps> = ({ name }) => {
  const history = useHistory();
  const isUserPage = /\/user\/.*/;

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <Button variant="link" onClick={() => history.goBack()}>
          <FontAwesomeIcon icon={faChevronLeft} /> Back
        </Button>
        <h4>{name}</h4>
        <div style={{ minWidth: '40px' }}>
          {isUserPage.test(history.location.pathname) && (
            <Button variant="success">
              <FontAwesomeIcon icon={faPlus} />
            </Button>
          )}
        </div>
      </div>
      <hr />
    </>
  );
};

export default Navigation;
