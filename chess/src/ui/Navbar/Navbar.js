import React, {useState} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import  Favicon from 'assets/favicon-32x32.png'; 
import classes from './Navbar.module.scss';
const NavLink = ({children, ...props}) => <Nav.Link className="text-light" {...props}>{children}
</Nav.Link>

export default function MainNavbar() {

    const [activeKey, setActiveKey] = useState('/game')

    return (
        <Navbar 
        bg="primary" 
        className="text-light"
        text="light"
        >
          <Navbar.Brand className="text-light">
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
          <NavLink  href="/game">O aplikacji</NavLink>
          <NavLink eventKey="options">Opcje</NavLink>
          <NavLink>  
              PL/EN
            </NavLink>
      </Nav>
      <Nav className={`${classes.UserNav} justify-self-end`}
      >
      <NavLink eventKey="/signup">
            Rejestracja
          </NavLink>
          <NavLink eventKey="/login" >
            Logowanie
          </NavLink>
      </Nav>
       </Navbar>
    )
}
