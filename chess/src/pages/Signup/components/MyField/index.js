import React from 'react'
import {Field} from 'formik';
import Form from 'react-bootstrap/Form';
export default function MyField({name, label, ...props}) {
    return (
      <Field name={name}>
          {({
            field, 
          meta: {touched, error}
        }) => {
            return  <Form.Group>
                  <Form.Label>{label}</Form.Label>
              < Form.Control 
              {...field}
              {...props}
              isInvalid={ touched && error}
              />
                  <Form.Control.Feedback type="invalid">
                    {error}
                  </Form.Control.Feedback>
              </Form.Group>
          }}
      </Field>
    )
}
