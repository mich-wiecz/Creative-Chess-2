import React, {useState} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import  Favicon from 'assets/favicon-32x32.png'; 
import classes from './Navbar.module.scss';
import {NavLink as RouterNavLink} from "react-router-dom"


import {useToasts} from 'contexts/ToastProvider';



const NavLink = (
  {
    exact = false, 
    eventKey, 
    userNav, 
    children, 
    ...props}) => <Nav.Link 
className="text-light" {...props}>
  {
    eventKey 
    ?
    <RouterNavLink 
    exact={exact}
    to={eventKey}
    className="text-light"
    activeClassName={` rounded p-2 ${userNav  ? "bg-primary text-light" : "bg-maroon"}`}
    >
    {children}
    </RouterNavLink>
    :
    children
  }

</Nav.Link>

export default function MainNavbar() {

  const [showToast, createToast] = useToasts();
  

    const [activeKey, setActiveKey] = useState('/');


   const firstToast = createToast('first', {title: "Udało się"});
   const secondToast = createToast('second', {title: "Jednak nie"});
  
    return (
        <Navbar 
        
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
        // fill
        // justify
        variant="pills"
        className="ml-5 justify-self-end flex-grow-1"
        activeKey={activeKey}
        onSelect={(selectedKey) => setActiveKey(selectedKey)}
      >   
          <NavLink  eventKey="/about">O aplikacji</NavLink>
          <NavLink exact eventKey="/">Gra</NavLink>
          <NavLink >Opcje</NavLink>
          <NavLink>  
              PL/EN
          </NavLink>
      </Nav>
      <Nav 
      onSelect={key => setActiveKey(key)}
      className={`${classes.UserNav} justify-self-end`}
      >
      <NavLink userNav eventKey="/signup">
            Rejestracja
          </NavLink>
          <NavLink userNav eventKey="/login" >
            Logowanie
          </NavLink>
      </Nav>
       </Navbar>
    )
}
