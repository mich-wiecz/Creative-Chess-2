import React, {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik} from 'formik'
import FirstFormPage from './FirstFormPage';
import SecondFormPage from './SecondFormPage';
import useFormikConfiguration from './formik-configuration';
import SpinnerButton from '@global-components/SpinnerButton';
import FieldsGroup from '../../utils/formik/FieldsGroup';
import FieldsList from '../../utils/formik/FieldsList';



export default function Signup() {

    const [formPage, setFormPage] = useState('first');
    const [wasRequestError, setWasRequestError] = useState(false);
    const [validateUntouched, setValidateUntouched] = useState(false);

    const {initialValues, validationSchema} = useFormikConfiguration()

    const goToFirstPage = () => setFormPage('first');
    const goToSecondPage = () => setFormPage('second');

    const handleSubmit = (values, { setSubmitting }) => {
        setTimeout(() => {
           const success = true;
           if (success ) {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            if (wasRequestError) setWasRequestError(false);
           } else {
               setWasRequestError(true);
               setSubmitting(false);
           }
           
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
            renderListFields
        }) => 
        <SecondFormPage 
        goToFirstPage={goToFirstPage} 
        renderFields={renderFields}
        validationButton={validationButton}
        submitButton={submitButton}
        renderListFields={renderListFields}
        wasError={wasRequestError}
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
            isSubmitting={isSubmitting}
            disabled={!couldBeSended} 
            className="w-25 bg-maroon" 
            onClick={handleSubmit}
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
              }) }
          
            </Form>
}}
            </Formik>
      )

}



