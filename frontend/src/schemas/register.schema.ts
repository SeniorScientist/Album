import * as yup from 'yup'

export const registerSchema = yup.object().shape({
  email: yup.string().email().min(8).max(16).required(),
  password: yup.string().min(8).max(64).required(),
  passwordConf: yup.string().min(8).max(64).required()
})