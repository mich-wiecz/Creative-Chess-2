import React, {useState} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import  Favicon from 'assets/favicon-32x32.png'; 
import classes from './MainNavbar.module.scss';
import {NavLink as RouterNavLink} from "react-router-dom";
import Button from 'react-bootstrap/Button'

import {useDispatch, useSelector} from 'react-redux';
import {logout, selectAuthenticated, selectUserInfo} from 'redux/userSlice';

import {useToasts} from 'contexts/ToastProvider';

const NavLink = (
  {
    exact = false, 
    eventKey, 
    userNav, 
    children, 
    ...props}) => 
 <Nav.Link 
 as={"div"}
className="text-light" {...props}>
    <RouterNavLink 
    exact={exact}
    to={eventKey}
    className="text-light"
    activeClassName={` rounded p-2 ${userNav  ? "bg-primary text-light" : "bg-maroon"}`}
    >
    {children}
    </RouterNavLink>
</Nav.Link>

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
        style={{zIndex: 2000}}
        bg="primary" 
        className="text-light"
        text="light"
        >
          <Navbar.Brand onClick={() => {
          showToast(firstToast);
          showToast(secondToast);
          } } className="text-light">
      <Image src={Favicon} alt="favicon - website logo" className="bg-light"/>
          </Navbar.Brand>
        <Nav
        variant="pills"
        className="ml-5 justify-self-end flex-grow-1"
        activeKey={activeKey}
        onSelect={(selectedKey) => setActiveKey(selectedKey)}
      >   
          <NavLink  eventKey="/about">O aplikacji</NavLink>
          <NavLink exact eventKey="/">Gra</NavLink>
          <NavLink eventKey="/options">Opcje</NavLink>
      </Nav>
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
          <>
          <NavLink userNav eventKey="/signup">
          Rejestracja
        </NavLink>
             <NavLink userNav eventKey="/login" >
             Logowanie
           </NavLink>
           </>
        }

     
      </Nav>
       </Navbar>
    )
}
