import { Navigate, Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import { useAuth } from '../contexts/auth-context'
import Navbar from '../pages/album/Navbar'

export default function PrivateLayout() {
  const { currentUser } = useAuth()

  return currentUser ? (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
        <Outlet />
      </Suspense>
    </>
  ) : (
    <Navigate to="/auth/signin" />
  )
}