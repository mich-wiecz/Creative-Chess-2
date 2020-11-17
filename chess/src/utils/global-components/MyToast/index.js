import React from 'react';
import Toast from 'react-bootstrap/Toast';
export default function MyToast({
    title = "Plac Zabaw", 
    text = "Witaj", 
    autohide = true,
    delay = 6000,
    toastStyleType,
    ...props
}) {
    return (
        <Toast
        autohide={autohide}
        delay={delay}
        {...props}
        >
     
  <Toast.Header className={` ${
      toastStyleType === 0 
      ? "bg-maroon" 
      : "bg-myblue"
      } text-light`}>
    <strong className="mr-auto">{title}</strong>
  </Toast.Header>
  <Toast.Body>
      {text}
      </Toast.Body>
</Toast>
    )
}
