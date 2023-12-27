import { Navigate, Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import { useAuth } from '../contexts/auth-context'
import Navbar from '../pages/album/Navbar'
import PathConstants from '../routes/path-constants'
import Loading from '../pages/Loading'

export default function PrivateLayout() {
  const { currentUser } = useAuth()

  return currentUser ? (
    <>
      <main className='flex flex-col min-h-full'>
        <Navbar />
        <div className='grow flex justify-center'>
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
    </>
  ) : (
    <Navigate to={PathConstants.SIGNIN} />
  )
}