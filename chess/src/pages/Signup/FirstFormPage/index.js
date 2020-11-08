import React from 'react'
import Button from 'react-bootstrap/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function FirstFormPage({
  goToSecondPage, 
  renderFields,
  validationButton,
  couldBeSended
}) {
    return (
        <div>
        <section aria-label="pola wymagane">
            {
                renderFields( 
                    [
                        {name: 'handle', label: 'Nazwa użytkownika*'},
                        {name: 'email', label: "Adres email*", type: 'email'},
                        {name: 'password', label: 'Hasło*', type: 'password'},
                        {name: 'repeatPassword', label: 'Powtórz hasło*',  type: 'password'}
                    ]
                    )
            }
            </section>
            <span className=" d-block border-bottom border my-5"/>
            <section className="pola nieobowiązkowe">
            {
                renderFields( 
                    [
                       
                        {name: 'name', label: 'Imię', },
                        {name: 'surname', label: 'Nazwisko'},
                        {name: 'sex', label: 'Płeć', as: "select", children: (
                          <>
                          <option>kobieta</option>
                          <option>mężczyzna</option>
                          </>
                        )},
                    ]
                    )
            }
            </section>
            <section 
            aria-label="form-page-navigation"
            className="d-flex justify-content-around"
            >
         {validationButton}
        <Button type="button" onClick={(e) => {
          e.preventDefault();
          goToSecondPage()
          }} disabled={!couldBeSended}>
          <FontAwesomeIcon icon={faArrowRight} size="lg"/>
        </Button>
        </section>
          
      </div>
    )
}
