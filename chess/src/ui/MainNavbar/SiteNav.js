import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { NavLink } from "./NavLink";

export function SiteNav({
  activeKey,
  onSelect,

}) {
  return (
    <Nav
      activeKey={activeKey}
      onSelect={onSelect}
      as={Row}
      variant="pills"
      className="ml-5 justify-self-end flex-grow-1 justify-content-start"
    >
      <Col  
      // className="px-3"
      style={{ maxWidth: 160 }}>
        <NavLink eventKey="/about"
        >
          O mnie
            </NavLink>
      </Col>
      <Col 
      // className="px-3"
      style={{ maxWidth: 160 }}>
        <NavLink exact eventKey="/">Gra</NavLink>
      </Col>
      <Col 
      // className="px-3"
      style={{ maxWidth: 160 }}>
        <NavLink eventKey="/options">Opcje</NavLink>
      </Col>
    </Nav>
  );
}
