import * as yup from 'yup';

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/
//required minimum 8 characters with at least one simple alphabet, capital alphabet and special character

export const basicSchema = yup.object().shape({
    email:yup.string().email("Enter valid email").required("Required"),
    password:yup.string().min(8).matches(passwordRules, "Required *[a-z], *[A-Z], *[!@#$%^&*]").required("Required")
})
