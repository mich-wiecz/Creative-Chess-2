import  React from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBug } from '@fortawesome/free-solid-svg-icons';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const ErrorInfo = ({
    entireAppLevel,
    noGoBackInErrorBoundary
}) => {

  // const [showModal, setShowModal] = useState(true);

    const history = useHistory();


  const goBack = () => {
    history.push('/');
  };

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <Modal
    show={true}
    backdrop="static"
    keyboard={false}
    centered
    animation={false}
  >
    <Modal.Header className="bg-primary">
  <Modal.Title className="text-danger">
    Na {entireAppLevel ? "stronie" : "podstronie"} wystąpił błąd
    </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <section className="d-flex justify-content-lg-between align-items-center">
        <FontAwesomeIcon icon={faBug} size="2x" />
        <p className="ml-3" >
        Wiemy już o problemie. Spróbuj jeszcze odświeżyć stronę lub wróć za jakiś czas.
        </p>
        </section>
    </Modal.Body>
    <Modal.Footer>
      <Button  onClick={reloadPage}>
        Odśwież stronę
      </Button>
      {
          !(entireAppLevel || noGoBackInErrorBoundary) &&
          <Button onClick={() => {
            goBack();
            reloadPage()
            }}>
          Wróć do poprzedniej podstrony
        </Button>
      }
    </Modal.Footer>
  </Modal>
  );
};

export default ErrorInfo;