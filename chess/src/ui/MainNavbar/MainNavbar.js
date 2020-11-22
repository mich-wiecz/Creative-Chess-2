import React, {useState} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import  Favicon from 'assets/favicon-32x32.png'; 
import classes from './MainNavbar.module.scss';
import {NavLink as RouterNavLink} from "react-router-dom";
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {useDispatch, useSelector} from 'react-redux';
import {logout, selectAuthenticated, selectUserInfo} from 'redux/userSlice';

import {useToasts} from 'contexts/ToastProvider';





const NavLink = (
  {
    exact = false, 
    eventKey, 
    userNav, 
    children, 
    className,
    ...props}) => (

 <Nav.Link 
 as={"div"}
className={` text-light p-0`} {...props}
>
    <RouterNavLink 
    exact={exact}
    to={eventKey}
    className={`${className} text-light d-flex p-2 m-0 `}
    activeClassName={` rounded ${userNav  ? "bg-primary text-light" : "bg-maroon"}`}
    >
    {children}
    </RouterNavLink>
</Nav.Link>
    )

export default function MainNavbar() {

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectAuthenticated);
  const userInfo = useSelector(selectUserInfo);
  

  const [showToast, createToast] = useToasts();
  

    const [activeKey, setActiveKey] = useState('/');

   const firstToast = createToast('first', {title: "Udało się"});
   const secondToast = createToast('second', {title: "Jednak nie"});
  
    return (
        <Navbar 
        style={{zIndex: 500, width: '100vw'}}
        bg="primary" 
        className="text-light p-0"
        text="light"
        expand="md"
        >
          <Navbar.Brand onClick={() => {
          showToast(firstToast);
          showToast(secondToast);
          } } className="text-light ml-5">
      <Image src={Favicon} alt="favicon - website logo" className="bg-light"/>
          </Navbar.Brand>
          <Navbar.Toggle 
          aria-controls="main-site-nav"
          className="bg-light"
          />
          <Navbar.Collapse id="main-site-nav">
        <Nav
        variant="pills"
        className="ml-5 justify-self-end flex-grow-1"
        activeKey={activeKey}
        onSelect={(selectedKey) => setActiveKey(selectedKey)}
      >   
  <Col md={3} xs={5} style={{maxWidth: 160}}>
          <NavLink eventKey="/about"
          >
            O aplikacji
            </NavLink>
          </Col>
        <Col md={3} xs={5} style={{maxWidth: 160}}>
          <NavLink exact eventKey="/">Gra</NavLink>
          </Col>
          <Col md={3} xs={5} style={{maxWidth: 160}}>
          <NavLink eventKey="/options">Opcje</NavLink>
          </Col>
      </Nav>
      <Row className="justify-content-end">
      <Col md={12} xs={6} >
      <Nav 
      onSelect={key => setActiveKey(key)}
      className={`${classes.UserNav} justify-self-end`}
      >
        {
          isAuthenticated 
          ?
          <div className="d-flex align-items-center">
          <p className="m-0 pr-3 " style={{color: 'lightblue'}}>
           Witaj{userInfo.handle ? `, ${userInfo.handle}` : ""} 
          </p>
          <Button className="bg-transparent border-0" onClick={() => dispatch(logout())}>
          Wyloguj się
           </Button>
        </div>
          :
          <div className="d-flex justify-content-around">
          <NavLink userNav eventKey="/signup">
          Rejestracja
        </NavLink>
             <NavLink userNav eventKey="/login" >
             Logowanie
           </NavLink>
           </div>
        }

     
      </Nav>
      </Col>
      </Row>
      </Navbar.Collapse>
       </Navbar>
    )
}
