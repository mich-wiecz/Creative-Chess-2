import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { NavLink as RouterNavLink } from "react-router-dom";




export const NavLink = (
  {
    exact = false,
    eventKey,
    userNav,
    children,
    className,
    ...props }) => (

    <Nav.Link
      as={"div"}
      className={` text-light p-0`} {...props}
    >
      <RouterNavLink
        exact={exact}
        to={eventKey}
        className={`${className} text-light d-flex p-2 m-0 `}
        activeClassName={` rounded ${userNav ? "bg-primary text-light" : "bg-maroon"}`}
      >
        {children}
      </RouterNavLink>
    </Nav.Link>
  );
