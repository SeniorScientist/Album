import * as Yup from 'Yup'

export interface SignUpCredential {
  email: string
  password: string
  passwordConf: string
}

export const registerSchema = Yup.object().shape({
  email: Yup.string().email().min(8).max(64).required('Email is a required field.'),
  password: Yup.string().min(8).max(64).required('Password is a required field.'),
  passwordConf: Yup.string().min(8).max(64).oneOf([Yup.ref('password')], 'Does not match with password.')
    .required('Password confirmation is a required field.')
})