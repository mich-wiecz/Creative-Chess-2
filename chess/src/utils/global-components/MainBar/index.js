import React from 'react';
import Col from 'react-bootstrap/Col';


export default function MainBar({children, ...props}) {

    return (
        <Col 
        lg={6}
        md={7}
        xs={10}
      style={{
        zIndex: 150,
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


