import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/auth-context'
import { useToast } from '../../contexts/toast-context'
import { useState } from 'react'
import Button from '../../components/button/button'
import Input from '../../components/input/input'
import { AiFillExclamationCircle } from 'react-icons/ai'
import MessageCard from '../../components/message-card/message-card'
import { EMessageTypes } from '../../types/message'
import { ProfileCredential, profileSchema } from '../../schemas/profile.schema'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Label from '../../components/label/label'

export default function UpdateProfile() {
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const { showToast } = useToast()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { register, formState: { errors }, handleSubmit } = useForm<ProfileCredential>({ resolver: yupResolver(profileSchema) })

  const onSubmit = async (data: ProfileCredential) => {
    const promises = []
    setLoading(true)
    setError('')

    if (data.email !== currentUser.email) {
      promises.push(updateEmail(data.email))
    }

    if (data.password) {
      promises.push(updatePassword(data.password))
    }

    Promise.all(promises)
      .then(() => {
        navigate('/')
        showToast('Profile updated Successfully')
      })
      .catch(() => {
        setError('Failed to update account')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-8">
          <Label>Update Profile</Label>

          <MessageCard message={error} type={EMessageTypes.DANGER} visible={!!error} />

          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <input type="hidden" name="remember" defaultValue="true" />

            <div className="-space-y-px rounded-md shadow-sm">
              <Input
                type="email"
                autoComplete="email"
                placeholder="Email"
                {...register('email')}
                required />
            </div>

            <div className="rounded-md shadow-sm">
              <h1 className="py-1 text-sm text-gray-500 flex items-center ">
                <AiFillExclamationCircle className="mr-1" /> Leave blank to keep
                the same
              </h1>

              <Input
                type="password"
                autoComplete="password"
                placeholder="Password"
                className='mb-2'
                {...register('password')}
                required />

              <Input
                type="password"
                autoComplete="password"
                placeholder="Confirm Password"
                {...register('passwordConf')}
                required />
            </div>

            <Button
              type="submit"
              disabled={loading}
            >
              Update
            </Button>

            <div className="text-sm text-center">
              <Link
                className="font-medium text-indigo-600 hover:text-indigo-500"
                to="/"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}