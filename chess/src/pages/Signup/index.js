import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik, FieldArray } from 'formik'
import FirstFormPage from './FirstFormPage';
import SecondFormPage from './SecondFormPage';
import useFormikConfiguration from './formik-configuration';
import Col from 'react-bootstrap/Col';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export default function Signup() {

    const [formPage, setFormPage] = useState('first');
    const [validateUntouched, setValidateUntouched] = useState(false);

    const {initialValues, validationSchema} = useFormikConfiguration()

    const goToFirstPage = () => setFormPage('first');
    const goToSecondPage = () => setFormPage('second');

    const handleSubmit = (values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 4000);
    };


    const formPages = {
        first: ({
            renderFields, 
            validationButton,
            couldBeSended
        }) =>  
        <FirstFormPage 
        goToSecondPage={goToSecondPage} 
        renderFields={renderFields}
        validationButton={validationButton} 
        couldBeSended={couldBeSended}
        />,
        second: ({
            renderFields, 
            validationButton, 
            submitButton,
            renderListFields,
            values
        }) => 
        <SecondFormPage 
        goToFirstPage={goToFirstPage} 
        renderFields={renderFields}
        validationButton={validationButton}
        submitButton={submitButton}
        renderListFields={renderListFields}
        values={values}
        />
    }

    function renderFields (formikProps, dataArray) {
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
                <Form.Control.Feedback 
                style={tooltipStyle}
                type="valid" 
                tooltip>
                     OK
                </Form.Control.Feedback>
                </Form.Group>
                </Form.Row>
            )
        })
    }


    function renderListFields (formikProps, dataArray) {

        return (
            <FieldArray>
                {({remove, push}) => {
return (
    <>
   { 
   dataArray.map((
       {name, label, children, ...props}, 
       index ) => {

        const {values, handleChange, touched, handleBlur, errors} = formikProps;
    
        const isInvalid = (touched[name] || validateUntouched) && errors[name];
    
        const tooltipStyle = {
            top: '0',
            left: "60%"
        }
            return (
        <Form.Row key={name}>
            <Col xs={2}>
                <Button onClick={() => remove(index)}>
                    <FontAwesomeIcon icon={faTrashAlt} color="red" size="2x"/>
                </Button>
            </Col>
        <Form.Group 
        as={Col}  
        xs={10}
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
        <Form.Control.Feedback 
        style={tooltipStyle}
        type="valid" 
        tooltip>
             OK
        </Form.Control.Feedback>
        </Form.Group>
        </Form.Row>
    )
    })
    }
<Button onClick={() => push('')}>
<FontAwesomeIcon icon={faPlusSquare} color="green" size="2x"/>
    </Button>
    </>
)
        }}
            </FieldArray>
        )

        
    }

    function customMapping (formikProps, type) {
        if (type === 'list') 
        return (dataArray) => renderListFields(formikProps, dataArray)
        return (dataArray) => renderFields(formikProps, dataArray)
    }

    

    return (
       
        <Formik
        validateOnMount
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
        handleSubmit,
        isValid,
        isSubmitting,
        validateForm,
        ...formikProps
      }) => {

        const renderFields = customMapping(formikProps);
        const renderListFields = customMapping(formikProps);

        const couldBeSended = isValid && !isSubmitting

        const submitButton = (
            <Button disabled={!couldBeSended} className="w-25 bg-maroon" onClick={handleSubmit}>
            OK
        </Button>
        )

        const validationButton = (
            <Button onClick={() => setValidateUntouched(true)}>
            Pokaż podpowiedzi
        </Button>
        )
      

      return  <Form 
        className="d-flex justify-content-center  p-3 flex-column rounded bg-primary w-50 mx-auto mt-5 text-light border-maroon"
        noValidate onSubmit={handleSubmit}>
          { formPages[formPage]({
              renderFields,
              validationButton,
              submitButton,
              couldBeSended,
              renderListFields,
              values: formikProps.values
              }) }
          
            </Form>
}}
            </Formik>
      )

}


// renderObject[formPage]



// <Formik
// initialValues={{ email: '', password: '' }}
// validationSchema={validationSchema}
// onSubmit={handleSubmit}
// >
// {({ isSubmitting }) => (
//   <Form component={BForm}> 
//   <BForm.Group>
//      <BForm.Label>Adres email</BForm.Label>
//     <Field type="email" name="email" component={BForm.Control} />
//     <ErrorMessage name="email" component={<BForm.Control.Feedback tooltip/>} />
//     <button type="submit" disabled={isSubmitting}>
//       Submit
//     </button>
//     </BForm.Group>
//   </Form>
// )}
// </Formik>



