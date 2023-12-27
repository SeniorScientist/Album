import * as Yup from 'Yup'

export interface ForgotPasswordCredential {
  email: string
}

export const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email().min(8).max(64).required('Email is a required field.'),
})