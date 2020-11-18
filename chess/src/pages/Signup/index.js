import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik} from 'formik'
import FirstFormPage from './FirstFormPage';
import SecondFormPage from './SecondFormPage';
import useFormikConfiguration from './formik-configuration';
import SpinnerButton from '@global-components/SpinnerButton';
import FieldsGroup from '../../utils/formik/FieldsGroup';
import FieldsList from '../../utils/formik/FieldsList';

import {loginOrSignup, selectStatusData} from 'redux/userSlice';
import {useSelector, useDispatch} from 'react-redux';



export default function Signup() {

    const dispatch = useDispatch();
    const {authenticated, loading, wasError} = useSelector(selectStatusData)

    const [formPage, setFormPage] = useState('first');
    // const [wasRequestError, setWasRequestError] = useState(false);
    const [wasSended, setWasSended] = useState(false);
    const [validateUntouched, setValidateUntouched] = useState(false);



    useEffect(() => {
        if (wasError) setWasSended(false);
    }, [wasError])

    const {initialValues, validationSchema} = useFormikConfiguration()

    const goToFirstPage = () => setFormPage('first');
    const goToSecondPage = () => setFormPage('second');

    const handleSubmit = (values, { setSubmitting }) => {
        const {
            handle,
            email,
            password,
            repeatPassword,
            ...rest
        } = values;

        dispatch(loginOrSignup({
            type: 'signup',
            userData: {
                signup: {
                    handle, 
                    email, 
                    password, 
                    confirmPassword: repeatPassword},
                details: {...rest}
            }
        }));
        setSubmitting(false);
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
            wasSended
        }) => 
        <SecondFormPage 
        goToFirstPage={goToFirstPage} 
        renderFields={renderFields}
        validationButton={validationButton}
        submitButton={submitButton}
        renderListFields={renderListFields}
        wasError={wasError}
        wasSended={wasSended}
        isAuthenticated={authenticated}
        />
    }

   


    function customMapping (formikProps, type) {
        if (type === 'list') 
        return (listName, config) => <FieldsList 
        formikProps={formikProps}
        listName={listName}
        {...config}
        />

        return (dataArray) => <FieldsGroup 
        formikProps={formikProps}
        validateUntouched={validateUntouched}
        dataArray={dataArray}
        
        />
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
        const renderListFields = customMapping(formikProps, 'list');

        const couldBeSended = isValid && !isSubmitting

        const submitButton = (
            <SpinnerButton
            isSubmitting={loading}
            disabled={!couldBeSended} 
            className="w-25 bg-maroon" 
            onClick={() => {
                setWasSended(true);
                handleSubmit()
            }}
            >
            <span> 
               OK
            </span>
            </SpinnerButton>
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
              wasSended
              }) }
          
            </Form>
}}
            </Formik>
      )

}



