import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { FieldArray} from 'formik';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export default function FieldsList({
    formikProps,
    listName,
    label,
    limit
}) {

        const {values, handleChange, handleBlur} = formikProps;
            const list = values[listName];
        return (
            <FieldArray name={listName}>
                {({remove, push}) => {

                    let tooMuch = false,
                    blancInputExist = false;

              

                return (
                    <>
                    <Form.Label className="d-block">
                        {label}
                    </Form.Label>
                    { 
        list.map((
            {value, children, ...props}, 
            index ) => {

            
                if(index >= limit) {
                    tooMuch = true;
                    return (
                        <p>
                          Przykro nam, że musimy Cię ograniczać, ale to już zbyt dużo punktów
                        </p>
                    )
                }

                if(list[index].trim() === '') {
                    blancInputExist = true;
                }
                   
            
                    return (
                <Form.Row key={index}>
                    <Col xs={2}>
                    
                            <Button onClick={() => remove(index)}>
                            <FontAwesomeIcon icon={faTrashAlt} color="red" size="2x"/>
                        </Button>
                       
                    </Col>
                <Form.Group 
                as={Col}  
                xs={10}
                controlId={`${listName}[${index}]`}
                >
                <Form.Control
                {...props}
                    name={`${listName}[${index}]`}
                    onBlur={handleBlur}
                    value={list[index]}
                    onChange={handleChange}
                />
                </Form.Group>
                </Form.Row>
            )
    })
    }
    {
        (!tooMuch && !blancInputExist) && 
        <Button onClick={() => push('')}>
        <FontAwesomeIcon icon={faPlusSquare} color="green" size="2x"/>
            </Button>
    }
         
    </>
)
        }}
            </FieldArray>
        )
    }

