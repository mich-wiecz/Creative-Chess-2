import React from 'react'
import Button from 'react-bootstrap/Button';
import SuccessModal from '../SuccessModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {useHistory} from 'react-router-dom';
import RequestErrorMessage from 'utils/formik/RequestErrorMessage';

export default function FirstFormPage({
  renderFields, 
  goToFirstPage, 
  submitButton,
  renderListFields,
  wasError,
  wasSended,
  isAuthenticated
}) {

  const history = useHistory();


  function renderFinalMessages ()  {
    if (!wasSended) return null;

    if (wasError) return <RequestErrorMessage />;
    if (isAuthenticated) return (
      <SuccessModal 
      show={true}
      onHide={() => history.push('/')}
      redirectToLogin={() => history.push('/login')}
      />
    )
  }

    return (
        <div>
            <section aria-label="dodatkowe informacje o użytkowniku">
            {
                renderFields( 
                    [
                        {name: 'about', 
                        label: 'Może napiszesz coś o sobie?',
                        as: 'textarea',
                        rows: 10
                      },
                        {name: 'dateOfBirth', label: (
                            <p>Data urodzenia
                            <span className="text-muted"> (Byśmy mogli złożyć Ci życzenia)
                            </span>
                             </p>
                             ),
                             type: 'date'
                            },
                           
                    ]
                    )
            }
            {
              renderListFields("hobbies", {
                label: "Zainteresowania"
              })
            }
            {renderFinalMessages()}
            </section>
            <section 
            aria-label="form-page-navigation"
            className="d-flex justify-content-around"
            >
          <Button onClick={goToFirstPage}>
        <FontAwesomeIcon icon={faArrowLeft} size="lg"/>
        </Button>
       { submitButton}
        </section>
       
      </div>
    )
}
