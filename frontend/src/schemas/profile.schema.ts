import * as Yup from 'Yup'

export interface ProfileCredential {
  email: string,
  password: string,
  passwordConf: string
}

export const profileSchema = Yup.object().shape({
  email: Yup.string().email().min(8).max(64).required('Email is a required field.'),
  password: Yup.string().min(8).max(64),
  passwordConf: Yup.string().min(8).max(64)
})