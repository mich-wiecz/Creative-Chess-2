
import  * as yup from 'yup';


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


export const lengthLimit = 20;

 export function tooLong (max, customText) {
     return `${customText ? customText : "Tekst jest zbyt długi"}. Maksymalna ilość znaków: ${max}.`
 }

 export function onlyLatin () {
     return `Pole może zawierać tylko łacińskie znaki`
 }


 export const loginDataValidation = {
    email: 
    yup.string().email().required(),
    password: 
    yup.string().min(6).required(),
 }

 

