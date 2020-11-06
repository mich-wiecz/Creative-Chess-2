import React from 'react'
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function FirstFormPage({
  renderFields, 
  goToFirstPage, 
  submitButton,
  renderListFields,
  values
}) {
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
              renderListFields(values.hobbies)
            }
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
