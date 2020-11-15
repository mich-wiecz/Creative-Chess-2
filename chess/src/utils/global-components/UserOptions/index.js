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
        <Modal.Header className="bg-myblue text-light" closeButton={closeButton}>
    <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body >
            <ListGroup>
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