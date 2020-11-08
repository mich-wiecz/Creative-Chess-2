import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';


export default function FieldsGroup({
   formikProps,
   dataArray,
   validateUntouched,
}) {
    return dataArray.map(({name, label, children, ...props} )=> {

        const {values, handleChange, touched, handleBlur, errors} = formikProps;

        const isInvalid = (touched[name] || validateUntouched) && errors[name];

        const tooltipStyle = {
            top: '0',
            left: "60%"
        }
    return (
        <Form.Row key={name}>
        <Form.Group 
        as={Col}  
        controlId={name}
        >
    <Form.Label>{label}</Form.Label>
          <Form.Control
          {...props}
            name={name}
            onBlur={handleBlur}
            value={values[name]}
            onChange={handleChange}
            isValid={!isInvalid}
            isInvalid={isInvalid}
          >
              {children}
            </Form.Control>
          <Form.Control.Feedback 
          style={tooltipStyle}
          type="invalid" 
          tooltip>
              {errors[name]}
        </Form.Control.Feedback >
        {
            validateUntouched &&
        <Form.Control.Feedback 
        style={tooltipStyle}
        type="valid" 
        tooltip>
             OK
        </Form.Control.Feedback>
        }
        
        </Form.Group>
        </Form.Row>
    )
})
}


