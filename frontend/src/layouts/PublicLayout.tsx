import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'

export default function PublicLayout() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </>
  )
}