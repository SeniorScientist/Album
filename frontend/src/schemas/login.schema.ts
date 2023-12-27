import * as Yup from 'Yup'

export interface SignInCredential {
  email: string
  password: string
}

export const loginSchema = Yup.object().shape({
  email: Yup.string().email().min(8).max(64).required('Email is a required field.'),
  password: Yup.string().min(8).max(64).required('Password is a required field.'),
})