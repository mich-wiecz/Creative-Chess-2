
import  * as yup from 'yup';

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


yup.setLocale({
mixed: {
    required: `Pole jest wymagane.`
},
date: {
    default: 'Pole może zawierać jedynie datę'
},
string: {
    default: 'Może zawierać tylko słowa',
    // eslint-disable-next-line no-template-curly-in-string
    max: 'Tekst jest zbyt długi. Maksymalna ilość znaków: ${max}.',
    // eslint-disable-next-line no-template-curly-in-string
    min: 'Pole powinno zawierać co najmniej ${min} znaków',
    email: 'Niepoprawny adres e-mail.'
}
})

 function tooLong (max, customText) {
     return `${customText ? customText : "Tekst jest zbyt długi"}. Maksymalna ilość znaków: ${max}.`
 }

 function onlyLatin () {
     return `Pole może zawierać tylko łacińskie znaki`
 }


 const lengthLimit = 20;

const validationSchema = yup.object().shape({
    name: 
    yup.string().trim().max(lengthLimit, tooLong(lengthLimit, "Długość imienia przekracza nasze możliwości")),
    surname: 
    yup.string().trim().max(lengthLimit, tooLong(lengthLimit, "Prosimy zmienić nazwisko na krótsze")),
    handle: yup.string().trim().max(lengthLimit, tooLong(lengthLimit, "Zbyt długa nazwa") ).required().matches(/[a-zA-Z]/, onlyLatin()),
    email: 
    yup.string().email().required(),
    password: 
    yup.string().min(6).required(),
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