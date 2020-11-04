import React from 'react';
import Toast from 'react-bootstrap/Toast';
import classes from './MyToast.module.scss'

export default function MyToast ({className, title, children, ...props}) {
    return (
        <Toast 
        className={`${className ? className : ''} ${classes.Toast} bg-primary`}
       {...props}
        >
  <Toast.Header>
    <strong className="mr-auto">{title ? title : 'Plac Zabaw'}</strong>
  </Toast.Header>
  <Toast.Body>
      {children}
      </Toast.Body>
</Toast>
    )
}