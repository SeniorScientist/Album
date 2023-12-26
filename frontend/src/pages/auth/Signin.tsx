import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/auth-context'
import PathConstants from '../../routes/path-constants'
import Label from '../../components/label/label'
import Input from '../../components/input/input'
import Button from '../../components/button/button'
import { useToast } from '../../contexts/toast-context'

export default function Signin() {

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const { login, currentUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { showToast, showError } = useToast()

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault()
    try {
      setLoading(true)
      await login(emailRef.current?.value, passwordRef.current?.value)
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
      <div className="flex flex-col items-center justify-center min-h-full">
        <div className="max-w-md space-y-6">
          <Label>Log in</Label>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="flex flex-col gap-y-5">

            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email address"
              ref={emailRef}
              required />

            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              ref={passwordRef}
              required />

          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                htmlFor="remember-me"
                className="block ml-2 text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                className="font-medium text-indigo-600 hover:text-indigo-500"
                to={PathConstants.FORGOTPWD}
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <Button
              type="submit"
              disabled={loading}
            >
              Sign in
            </Button>
          </div>
          <div className="text-sm text-center">
            <Link
              className="font-medium text-indigo-600 hover:text-indigo-500"
              to={PathConstants.SIGNUP}
            >
              Don't have an account?
            </Link>
          </div>
        </form >
      </div >
    </>
  )
}
