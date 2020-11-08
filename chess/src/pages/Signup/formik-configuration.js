
import  * as yup from 'yup';
import {tooLong, onlyLatin, lengthLimit, loginDataValidation} from 'utils/formik/shared-validation';

const initialValues = {
    name: '',
    surname: '',
    handle: '',
    email: '',
    password: '',
    repeatPassword: '',
    sex: 'kobieta',
    about: '',
    hobbies: [],
    dateOfBirth: new Date()
}



const validationSchema = yup.object().shape({
    name: 
    yup.string().trim().max(lengthLimit, tooLong(lengthLimit, "Długość imienia przekracza nasze możliwości")),
    surname: 
    yup.string().trim().max(lengthLimit, tooLong(lengthLimit, "Prosimy zmienić nazwisko na krótsze")),
    handle: yup.string().trim().max(lengthLimit, tooLong(lengthLimit, "Zbyt długa nazwa") ).required().matches(/[a-zA-Z]/, onlyLatin()),
    ...loginDataValidation,
    repeatPassword: 
    yup.string().oneOf([yup.ref('password'), null], "Hasła nie są takie same").required(),
    sex: 
    yup.mixed().oneOf(['kobieta', 'mężczyzna']).required(),
    about: 
    yup.string(),
    hobbies: 
    yup.array().of(yup.string(), 'Może zawierać tylko ciągi znaków'),
    dateOfBirth: yup.date().default(() => new Date())
})

export default function useFormikConfiguration() {
    return {initialValues, validationSchema};
};