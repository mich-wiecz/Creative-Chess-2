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
      {...props}
      >
        <Modal.Header closeButton={closeButton}>
    <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ListGroup>
       {children}
       </ListGroup>
        </Modal.Body>
      </Modal>
    )
},
Option: function  ({children}) {
  return  <ListGroup.Item className="text-center">
   {children}
    </ListGroup.Item>
}
}

export default UserOptions;