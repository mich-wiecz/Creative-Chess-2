import * as React from "react";
import classes from "./PawnSwitch.module.scss";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChessPawn } from '@fortawesome/free-solid-svg-icons';


export default function PawnSwitch({
  className = "",
  isOn,
  onToggle,
}) {
  return (
    <Row
    className={`${className} ${classes.Container}`}
      onClick={onToggle}
    >

      <Col className={` rounded bg-light cursor-pointer border d-flex p-0`}  xs={12}>
      <div
        className={`
        ${classes.Pawn}
            ${isOn 
              ? 
              `${classes.Left} bg-success` 
              : 
              `${classes.Right} bg-danger`
            } 
            w-50 d-flex align-items-center justify-content-center rounded
            `}
      >
        <FontAwesomeIcon icon={faChessPawn} size="lg" />
      </div>
      </Col>

    </Row>

  );
}