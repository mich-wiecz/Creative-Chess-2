import React from 'react';
import Nav from 'react-bootstrap/Nav';
import classes from './MainNavbar.module.scss';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { NavLink } from "./NavLink";

export function UserNav({
  isAuthenticated,
  userHandle,
  onLogout,
  onSelect
}) {
  return (
    <Row className="justify-content-end">
      <Col md={12} xs={6}>
        <Nav
          onSelect={onSelect}
          className={`${classes.UserNav} justify-self-end`}
        >
          {isAuthenticated
            ?
            <div className="d-flex align-items-center">
              <p className="m-0 pr-3 " style={{ color: 'lightblue' }}>
                Witaj{userHandle ? `, ${userHandle}` : ""}
              </p>
              <Button className="bg-transparent border-0" onClick={onLogout}>
                Wyloguj się
             </Button>
            </div>
            :
            <div className="d-flex justify-content-around  pr-4">
              <NavLink userNav eventKey="/signup">
                Rejestracja
          </NavLink>
              <NavLink userNav eventKey="/login">
                Logowanie
             </NavLink>
            </div>}
        </Nav>
      </Col>
    </Row>
  );
}
