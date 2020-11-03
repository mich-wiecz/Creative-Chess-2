import React, {useState} from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import  Favicon from './assets/favicon-32x32.png'; 

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
        fill
        // justify
        variant="pills"
        className="ml-5 justify-content-center text-light"
        activeKey={activeKey}
        onSelect={(selectedKey) => setActiveKey(selectedKey)}
      >
        <Nav.Item>
          <NavLink  href="/game">O aplikacji</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink eventKey="options">Opcje</NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink >  
              PL/EN
            </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink eventKey="/login" >
            Zaloguj się
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink eventKey="/signup">
            Zarejestruj się
          </NavLink>
        </Nav.Item>
      </Nav>
       </Navbar>
    )
}
