import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/auth-context'
import PathConstants from '../../routes/path-constants'
import Label from '../../components/label/label'
import Input from '../../components/input/input'
import Button from '../../components/button/button'
import { useToast } from '../../contexts/toast-context'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SignInCredential, loginSchema } from '../../schemas/login.schema'
import MessageCard from '../../components/message-card/message-card'
import { EMessageTypes } from '../../types/message'
import SpacerWithText from '../../components/spacer/spacer-with-text'
import SocialSignIn from './SocialSignIn'
import { Checkbox } from '../../components/checkbox/checkbox'

export default function SignIn() {

  const { register, formState: { errors }, handleSubmit } = useForm<SignInCredential>({ resolver: yupResolver(loginSchema) })
  const { login } = useAuth()
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const { showToast, showError } = useToast()

  const onSubmit = async (data: SignInCredential) => {
    try {
      setLoading(true)
      await login(data.email, data.password)
      showToast('LOGIN SUCCESSFULLY')
      navigate('/')
    } catch (error: any) {
      if (error!.code === 'auth/invalid-credential') {
        showError('INVALID LOGIN CREDENTIALS')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-8">
          <Label>Log in</Label>

          <MessageCard message={error} type={EMessageTypes.DANGER} visible={!!error} />

          <form className="mt-8 space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="remember" defaultValue="true" />

            <div className="flex flex-col gap-y-5">
              <Input
                type="email"
                autoComplete="email"
                placeholder="Email address"
                {...register('email')}
                required />

              <Input
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                {...register('password')}
                required />
            </div>

            {Object.keys(errors).length > 0 &&
              <div className='flex flex-col gap-y-2'>
                {errors.email && <MessageCard message={errors.email.message || ''} type={EMessageTypes.DANGER} />}
                {errors.password && <MessageCard message={errors.password.message || ''} type={EMessageTypes.DANGER} />}
              </div>}

            <div className="flex items-center justify-between">
              <div className="flex items-center">

                <Checkbox />

                <label
                  htmlFor="remember-me"
                  className="block ml-2 text-sm text-label font-sans text-caption"
                >
                  Remember me
                </label>
              </div>

              <Link
                className="font-medium text-indigo-600 hover:text-indigo-500 text-sm"
                to={PathConstants.FORGOTPWD}
              >
                Forgot your password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={loading}
            >
              Sign in
            </Button>

            <div className="text-sm text-center">
              <Link
                className="font-medium text-indigo-600 hover:text-indigo-500"
                to={PathConstants.SIGNUP}
              >
                Don't have an account?
              </Link>
            </div>
          </form >

          <SpacerWithText text="or" />

          <SocialSignIn setError={setError} enabled={!loading} />
        </div >
      </div>
    </>
  )
}
