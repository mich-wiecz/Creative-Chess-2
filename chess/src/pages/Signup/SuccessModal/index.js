import React from 'react';
import UserOptions from '@global-components/UserOptions';
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
               <Button onClick={redirectToLogin}>
                Zaloguj się
               </Button>
           </UserOptions.Option>
       </UserOptions.Modal>
    )
}
