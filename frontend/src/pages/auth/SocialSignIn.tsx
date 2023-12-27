import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/auth-context'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import Button from '../../components/button/button'

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
    <div className="flex flex-wrap justify-between gap-2">
      <Button
        onClick={handleGoogleLogin}
        disabled={!enabled}
        variant='icon'
        size='icon'>
        <span className="inset-y-0 left-0 flex items-center">
          <FaGoogle className="text-gray-500 h-7 w-7 group-hover:text-gray-600" />
        </span>
      </Button>
      <Button
        onClick={handleGithubLogin}
        disabled={!enabled}
        variant='icon'
        size='icon'>
        <span className="inset-y-0 left-0 flex items-center">
          <FaGithub className="text-gray-500 h-7 w-7 group-hover:text-gray-600" />
        </span>
      </Button>
    </div>
  )
}