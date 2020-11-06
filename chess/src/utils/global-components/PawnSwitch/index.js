import * as React from "react";
import classes from "./PawnSwitch.module.scss";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChessPawn } from '@fortawesome/free-solid-svg-icons';


export default function PawnSwitch({
  className = "",
  isOn,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`${classes.Container} ${className}) rounded bg-light cursor-pointer border`}
    >
      <div
        className={`
            ${isOn ? `${classes.Left} bg-success` : `${classes.Right} bg-danger`} 
            w-50 h-100 d-flex rounded justify-content-center align-items-center
            `}
      >
        <FontAwesomeIcon icon={faChessPawn} size="lg" className="" />
      </div>
    </div>

  );
}