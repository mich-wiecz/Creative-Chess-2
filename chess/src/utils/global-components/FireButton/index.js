import React from 'react'
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFire } from '@fortawesome/free-solid-svg-icons';

export default function FireButton({
    onClick,
    className,
    children,
    ...props
}) {
    return (
        <Button 
        className={`${className} bg-maroon w-50"`} 
        onClick={onClick}
        {...props}
        >
        <div className="d-flex justify-content-around">
      <FontAwesomeIcon icon={faFire} size="lg" color="pink"/>
        {children}
        <FontAwesomeIcon icon={faFire} size="lg" color="pink"/>
        </div>
        </Button>
    )
}
