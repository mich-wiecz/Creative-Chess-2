import React, {useState} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
import  Favicon from 'assets/favicon-32x32.png'; 
import {useLocation} from "react-router-dom";

import {useDispatch, useSelector} from 'react-redux';
import {logout, selectAuthenticated, selectUserInfo, languageChanged, selectLanguage} from 'redux/userSlice';
import { LanguageSwitch } from './LanguageSwitch';
import { GoBackButton } from './GoBackButton';
import { SiteNav } from './SiteNav';
import { UserNav } from './UserNav';



export default function MainNavbar() {

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectAuthenticated);
  const userInfo = useSelector(selectUserInfo);
  
     const currPath = useLocation().pathname;

    const [activeKey, setActiveKey] = useState('/');


    const lang = useSelector(selectLanguage);

  
    return (
      <div className="position-relative">
        {
          currPath === '/about' &&
         <LanguageSwitch 
         lang={lang}
         onClick={() => dispatch(languageChanged())}
         />
        }

        <Navbar 
        style={{
          zIndex: 1500, 
          width: '100vw',
          paddingRight: 12,
        }}
        bg="primary" 
        className="text-light p-0"
        text="light"
        expand="md"
        >
          <Navbar.Brand 
        className="text-light ml-5">
      <Image src={Favicon} alt="favicon - website logo" className="bg-light"/>
          </Navbar.Brand>


          {
            (currPath !== '/') &&
           <GoBackButton />
          }
        
          <Navbar.Toggle 
          aria-controls="main-site-nav"
          className="bg-light mr-3"
          />
          <Navbar.Collapse id="main-site-nav">

      <SiteNav 
      activeKey={activeKey}
      onSelect={(selectedKey) => setActiveKey(selectedKey)}
      />

      <UserNav 
      onSelect={(selectedKey) => setActiveKey(selectedKey)}
      isAuthenticated={isAuthenticated}
      onLogout={() => dispatch(logout())}
      userHandle={userInfo.handle}
      />


      
      </Navbar.Collapse>
       </Navbar>
       </div>
    )
}
