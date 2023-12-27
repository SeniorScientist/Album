import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/auth-context'
import { FaGithub, FaGoogle } from 'react-icons/fa'

export interface ISocialSignInProps {
  enabled?: boolean
  setError: (error: string) => void
}

export default function SocialSignIn({ enabled = true, setError }: ISocialSignInProps) {
  const { googleSignIn, githubSignIn } = useAuth()
  const navigate = useNavigate()

  async function handleGoogleLogin(): Promise<void> {
    try {
      setError('')
      await googleSignIn()
      navigate('/')
    } catch {
      setError('Failed to log in with Google')
    }
  }

  async function handleGithubLogin(): Promise<void> {
    try {
      setError('')
      await githubSignIn()
      navigate('/')
    } catch (err) {
      console.log(err)
      setError('Failed to log in with GitHub')
    }
  }

  return (
    <div className="flex flex-wrap justify-between gap-2 ">
      <button
        onClick={handleGoogleLogin}
        disabled={!enabled}
        className="relative flex justify-center flex-grow py-2 text-sm font-medium transition-colors bg-gray-200 border border-transparent rounded-md min-w-fit px-9 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <span className="inset-y-0 left-0 flex items-center ">
          <FaGoogle className="text-gray-500 h-7 w-7 group-hover:text-gray-600" />
        </span>
      </button>
      <button
        onClick={handleGithubLogin}
        disabled={!enabled}
        className="relative flex justify-center flex-grow py-2 text-sm font-medium transition-colors bg-gray-200 border border-transparent rounded-md min-w-fit px-9 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <span className="inset-y-0 left-0 flex items-center ">
          <FaGithub className="text-gray-500 h-7 w-7 group-hover:text-gray-600" />
        </span>
      </button>
    </div>
  )
}