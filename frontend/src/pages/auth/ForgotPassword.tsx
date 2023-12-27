import { useState } from 'react'
import { Link } from 'react-router-dom'
import PathConstants from '../../routes/path-constants'
import Button from '../../components/button/button'
import MessageCard from '../../components/message-card/message-card'
import { useForm } from 'react-hook-form'
import { ForgotPasswordCredential, forgotPasswordSchema } from '../../schemas/forgot-password.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '../../contexts/auth-context'
import { useToast } from '../../contexts/toast-context'
import { EMessageTypes } from '../../types/message'
import Input from '../../components/input/input'
import Label from '../../components/label/label'

export default function ForgotPassword() {
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const { register, formState: { errors }, handleSubmit } = useForm<ForgotPasswordCredential>({ resolver: yupResolver(forgotPasswordSchema) })
  const { resetPassword } = useAuth()
  const { showToast, showError } = useToast()

  const onSubmit = async (data: ForgotPasswordCredential) => {
    try {
      setError('')
      setLoading(true)
      await resetPassword(data.email)
      showToast('Check your inbox for further instructions')
    } catch {
      setError('Failed to reset password')
    }

    setLoading(false)
  }

  return (
    <>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-8">
          <Label>Password Reset</Label>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="remember" defaultValue="true" />

            <Input
              type="email"
              autoComplete="email"
              placeholder="Email address"
              {...register('email')}
              required />

            {errors.email && <MessageCard message={errors.email.message || ''} type={EMessageTypes.DANGER} />}

            <Button
              type="submit"
              disabled={loading}
            >
              Reset
            </Button>

            <div className="text-sm text-center">
              <Link
                className="font-medium text-indigo-600 hover:text-indigo-500"
                to={PathConstants.SIGNIN}
              >
                Back to login
              </Link>
            </div>
          </form>
        </div >
      </div >
    </>
  )
}