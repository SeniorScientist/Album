import PathConstants from './path-constants'
import { Navigate, RouteObject } from 'react-router-dom'
import PublicLayout from '../layouts/PublicLayout'
import Page404 from '../pages/auth/Page404'
import React from 'react'
import PrivateLayout from '../layouts/PrivateLayout'

const routes: RouteObject[] = [
  {
    path: '/', errorElement: <Page404 />, children: [
      {
        path: PathConstants.AUTH, element: <PublicLayout />, children: [
          { path: PathConstants.AUTH, element: <Navigate to={PathConstants.SIGNIN} /> },
          { path: PathConstants.SIGNUP, Component: React.lazy(() => import('../pages/auth/SignUp')) },
          { path: PathConstants.SIGNIN, Component: React.lazy(() => import('../pages/auth/SignIn')) },
          { path: PathConstants.FORGOTPWD, Component: React.lazy(() => import('../pages/auth/ForgotPassword')) }
        ]
      },
      {
        element: <PrivateLayout />, children: [
          { path: '/', element: <Navigate to={PathConstants.DASHBOARD} /> },
          { path: PathConstants.UPDATEPROFILE, Component: React.lazy(() => import('../pages/auth/UpdateProfile')) },
          { path: PathConstants.DASHBOARD, Component: React.lazy(() => import('../pages/album/Dasboard')) },
          { path: PathConstants.UPLOAD, Component: React.lazy(() => import('../pages/album/Upload')) }
        ]
      }
    ]
  }
]

export default routes