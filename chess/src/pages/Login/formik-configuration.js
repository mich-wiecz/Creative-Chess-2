
import  * as yup from 'yup';
import {loginDataValidation} from 'utils/formik/shared-validation';

const initialValues = {
email: '',
password: ''
}

const validationSchema = yup.object().shape(loginDataValidation)

export default function useFormikConfiguration() {
    return {initialValues, validationSchema};
};