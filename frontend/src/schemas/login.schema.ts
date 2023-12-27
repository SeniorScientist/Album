import * as yup from 'yup'

export const loginSchema = yup.object().shape({
  email: yup.string().email().min(8).max(64).required('Email is a required field.'),
  password: yup.string().min(8).max(64).required('Password is a required field.'),
})