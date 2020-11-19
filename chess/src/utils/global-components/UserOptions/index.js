import React from 'react';
import Modal from 'react-bootstrap/Modal';
import ListGroup from 'react-bootstrap/ListGroup';


const UserOptions = {
Modal:  function  ({
    children,
    closeButton = true,
    title,
    centered = true,
...props
}) {
    return (
        <Modal
        centered={centered}
        style={{
          zIndex: 12000
        }}
      {...props}
      >
        <Modal.Header className="bg-myblue text-light" closeButton={closeButton}>
    <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-secondary">
            <ListGroup className="bg-primary">
       {children}
       </ListGroup>
        </Modal.Body>
      </Modal>
    )
},
Option: function  ({children}) {
  return  <ListGroup.Item className="bg-secondary text-light text-center">
   {children}
    </ListGroup.Item>
}
}

export default UserOptions;