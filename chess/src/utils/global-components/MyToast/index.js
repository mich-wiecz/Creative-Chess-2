import React from 'react';
import Toast from 'react-bootstrap/Toast';
export default function MyToast({
    title = "Plac Zabaw", 
    text = "Witaj", 
    ...props
}) {
    return (
        <Toast
        {...props}
        >
     
  <Toast.Header className={`bg-maroon text-light`}>
    <strong className="mr-auto">{title}</strong>
  </Toast.Header>
  <Toast.Body>
      {text}
      </Toast.Body>
</Toast>
    )
}
