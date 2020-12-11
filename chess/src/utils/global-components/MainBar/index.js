import React from 'react';
import Col from 'react-bootstrap/Col';


export default function MainBar({children, ...props}) {

    return (
        <Col 
        lg={5}
        md={7}
        sm={10}
        xs={12}
      style={{
        zIndex: 4000,
        height: 45
      }}
      className=" mx-auto d-flex p-0"
      aria-label="Główny pasek na stronie"
      {...props}
      >
        {children}
      </Col>
    )
}


