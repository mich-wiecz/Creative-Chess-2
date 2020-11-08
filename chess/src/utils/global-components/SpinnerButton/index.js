import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

export default function SpinnerButton({
    isSubmitting,
    children,
    ...props
}) {
    return (
        <Button 
        {...props}
        >  
        <div className="position-relative">
         {
         isSubmitting && 
         <>
         <Spinner
         style={{
             position: 'absolute',
             top: '0',
             left: '0',
             right: '0',
             marginLeft: '-5px',
             opacity: 1
         }}
         as="span"
         animation="border"
         role="status"
         aria-hidden="true"
       />
       <span className="sr-only">Ładowanie...</span>
       </>
         }
         {children}
            </div> 
        </Button>
        )
}
