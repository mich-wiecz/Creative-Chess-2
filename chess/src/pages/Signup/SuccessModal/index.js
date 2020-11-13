import React from 'react';
import UserOptions from 'Playground/ColorMotivePanel/MotivesCollection/node_modules/@global-components/UserOptions';
import Button from 'react-bootstrap/Button';

export default function SuccessModal({
    show,
    onHide,
    redirectToLogin,
}) {
    return (
       <UserOptions.Modal
       show={show}
       onHide={onHide}
       title="Sukces! Zostałeś zarejestrowany."
       className
       >
           <UserOptions.Option>
               <Button onClick={onHide} className="w-100">
                Przejdź do strony głównej
               </Button>
           </UserOptions.Option>
           <UserOptions.Option>
               <Button onClic={redirectToLogin}>
                Zaloguj się
               </Button>
           </UserOptions.Option>
       </UserOptions.Modal>
    )
}
