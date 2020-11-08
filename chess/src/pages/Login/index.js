import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import { Formik} from 'formik'
import useFormikConfiguration from './formik-configuration';
import SpinnerButton from '@global-components/SpinnerButton';
import FieldsGroup from 'utils/formik/FieldsGroup';
import Modal from 'react-bootstrap/Modal';
import {useHistory, NavLink} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import RequestErrorMessage from 'utils/formik/RequestErrorMessage';

export default function Login() {


    const [wasRequestError, setWasRequestError] = useState(false);

    const history = useHistory('/')

    const {initialValues, validationSchema} = useFormikConfiguration()


    const handleGoingMainPage = () => {
        history.push('/')
    }

    const handleSubmit = (values, { setSubmitting }) => {
        setTimeout(() => {
           const success = true;
           if (success ) {
            setSubmitting(false);
            if (wasRequestError) setWasRequestError(false); 
            handleGoingMainPage();
           } else {
               setWasRequestError(true);
               setSubmitting(false);
           }
           
          }, 4000);
    };




    

    return (
       <Modal
       style={{
           position: 'absolute',
           top: '10%',
           left: "20%"
           }
       }
       show="true"
       onHide={handleGoingMainPage}
       backdrop="static"
       >
           <Modal.Header className="bg-maroon text-light" closeButton>
               <h5>
               Zaloguj się  
               </h5>
               
           </Modal.Header>
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


        const couldBeSended = isValid && !isSubmitting

      return  <Form 
        className="d-flex justify-content-center  p-3 flex-column rounded bg-primary w-100 mx-auto text-light border-maroon"
        noValidate 
        onSubmit={handleSubmit}
        >
   
            <FieldsGroup 
         dataArray={[
             {name: 'email', label: "Adres e-mail", type: "email"},
             {name: 'password', label: "Hasło", type: "password"}
         ]}
        formikProps={formikProps}        
        />
            <section>
                {
                    wasRequestError &&
                    <RequestErrorMessage />
                }
           
                <section className="d-flex justify-content-around">
                <Button onClick={handleGoingMainPage}>
                    Zrezygnuj
                </Button>
             <SpinnerButton
            isSubmitting={isSubmitting}
            disabled={!couldBeSended} 
            className="w-25 bg-maroon" 
            onClick={handleSubmit}
            >
            <span> 
               OK
            </span>
            </SpinnerButton>
            </section>
            <span className="mt-3 border border-bottom d-block" />
            <p className="mt-3">
                Nie masz jeszcze konta? {" "} {" "}
                <Button variant="maroon" className="ml-3">
                <NavLink className="text-light" to="/signup">
                 Zarejestruj się!
                 </NavLink>
                </Button>
               
            </p>
            </section>
            </Form>
}}
            </Formik>
            </Modal>
      )
}