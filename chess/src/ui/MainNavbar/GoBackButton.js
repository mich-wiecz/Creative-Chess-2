import React from 'react';
import { NavLink as RouterNavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export function GoBackButton() {
  return (
    <Button variant="light" className='d-md-none'>
      <RouterNavLink to="/">
        <FontAwesomeIcon
          icon={faArrowLeft} />
        <span className="ml-3">
          Wróć do gry
          </span>

      </RouterNavLink>

    </Button>
  );
}
