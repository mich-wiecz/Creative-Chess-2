import React from 'react';
import Col from 'react-bootstrap/Col';


export default function MainBar({children, ...props}) {

    return (
        <Col 
        lg={6}
        md={7}
        sm={10}
        xs={12}
      style={{
        zIndex: 4000,
        height: 45
      }}
      className=" mx-auto d-flex"
      aria-label="Główny pasek na stronie"
      {...props}
      >
        {children}
      </Col>
    )
}


