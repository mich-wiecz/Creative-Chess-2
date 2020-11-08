import React from 'react'
import Button from 'react-bootstrap/Button';
import SuccessModal from '../SuccessModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {useHistory} from 'react-router-dom'

export default function FirstFormPage({
  renderFields, 
  goToFirstPage, 
  submitButton,
  renderListFields,
  wasError
}) {

  const history = useHistory();

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
            </section>
            {
          wasError 
          ?
          <p className="text-danger px-2">
            Błąd podczas wysyłania formularza! Spróbuj wysłać ponowie.. albo wróć za jakiś czas.
          </p>
          :
          <SuccessModal 
          show={true}
          onHide={() => history.push('/')}
          redirectToLogin={() => history.push('/login')}
          />
        }
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
