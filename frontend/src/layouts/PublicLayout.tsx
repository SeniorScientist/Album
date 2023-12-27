import { Navigate, Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import Loading from '../pages/Loading'
import { useAuth } from '../contexts/auth-context'
import PathConstants from '../routes/path-constants'

export default function PublicLayout() {
  const { currentUser } = useAuth()

  return !currentUser ? (
    <>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </>
  ) : (
    <Navigate to={PathConstants.DASHBOARD} />
  )
}