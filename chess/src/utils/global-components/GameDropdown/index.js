import React from 'react';
import BootstrapDropdown from 'react-bootstrap/Dropdown';



export const Dropdown = ({children, ...props}) => {
    return (
        <BootstrapDropdown  
       {...props}
        >
            {children}
        </BootstrapDropdown>
    )
}

export const DropdownMenu = ({children, ...props}) => {
    return (
        <BootstrapDropdown.Menu  
       {...props}
        >
            {children}
        </BootstrapDropdown.Menu>
    )
}


export const DropdownToggle = ({children, ...props}) => {
    return (
        <BootstrapDropdown.Toggle  
        className="bg-maroon"
       {...props}
        >
            {children}
        </BootstrapDropdown.Toggle>
    )
}

export const DropdownHeader = ({children, ...props}) => {
    return (
        <BootstrapDropdown.Header  
        className="font-weight-bold"
       {...props}
        >
            {children}
        </BootstrapDropdown.Header>
    )
}

export const DropdownItem = ({children, ...props}) => {
    return (
        <BootstrapDropdown.Item  
        className="bg-primary text-light"
       {...props}
        >
            {children}
        </BootstrapDropdown.Item>
    )
}