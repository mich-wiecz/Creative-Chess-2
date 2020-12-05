import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

export default function Footer() {
    return (
        <Navbar  
        className={` text-dark d-flex justify-content-between` } 
        fixed="bottom" 
        style={{zIndex: -1}}
        as="footer">
            <section className="d-flex">
            <span className="mr-2">&copy;</span>
            <h5>Creative Chess</h5>
            </section>
            <section> 
         <span>{new Date().getFullYear()}</span>
            </section>
        </Navbar>
    )
}
