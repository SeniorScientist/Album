import { useState } from 'react'
import { useAuth } from '../../contexts/auth-context'
import { Link, useNavigate } from 'react-router-dom'
import SocialSignIn from './SocialSignIn'
import SpacerWithText from '../../components/spacer/spacer-with-text'
import Label from '../../components/label/label'
import Input from '../../components/input/input'
import Button from '../../components/button/button'
import PathConstants from '../../routes/path-constants'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SignUpCredential, registerSchema } from '../../schemas/register.schema'
import { EMessageTypes } from '../../types/message'
import MessageCard from '../../components/message-card/message-card'

export default function SignUp() {
  const { signup } = useAuth()
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const { register, formState: { errors }, handleSubmit } = useForm<SignUpCredential>({ resolver: yupResolver(registerSchema) })


  const onSubmit = async (data: SignUpCredential) => {
    try {
      setError('')
      setLoading(true)
      await signup(data.email, data.password)
      navigate('/')
    } catch {
      setError('Failed to create an account')
    }

    setLoading(false)
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-full px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-8">
          <Label>Create an account</Label>

          <MessageCard message={error} type={EMessageTypes.DANGER} visible={!!error} />

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="remember" defaultValue="true" />

            <div className="flex flex-col -space-y-px rounded-md shadow-sm gap-y-5">
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

              <Input
                type="password"
                autoComplete="current-password"
                placeholder="Confirm Password"
                {...register('passwordConf')}
                required />
            </div>

            {Object.keys(errors).length > 0 &&
              <div className='flex flex-col gap-y-2'>
                {errors.email && <MessageCard message={errors.email.message || ''} type={EMessageTypes.DANGER} />}
                {errors.password && <MessageCard message={errors.password.message || ''} type={EMessageTypes.DANGER} />}
                {errors.passwordConf && <MessageCard message={errors.passwordConf.message || ''} type={EMessageTypes.DANGER} />}
              </div>}

            <Button
              type="submit"
              disabled={loading}
            >
              Sign up
            </Button>

            <div className="text-sm text-center">
              <Link
                className="font-medium text-indigo-600 hover:text-indigo-500"
                to={PathConstants.SIGNIN}
              >
                Already have an account?
              </Link>
            </div>
          </form>

          <SpacerWithText text="or" />
          <SocialSignIn setError={setError} enabled={!loading} />
        </div>
      </div>
    </>
  )
}
