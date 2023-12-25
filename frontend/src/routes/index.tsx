import PathConstants from './path-constants'
import { Navigate, RouteObject } from 'react-router-dom'
import Layout from '../layouts/Layout'
import Page404 from '../pages/auth/Page404'
import React from 'react'

const routes: RouteObject[] = [
  {
    path: '/', element: <Layout />, errorElement: <Page404 />, children: [
      {
        path: PathConstants.AUTH, children: [
          { path: PathConstants.AUTH, element: <Navigate to={PathConstants.LOGIN} /> },
          { path: PathConstants.LOGIN, Component: React.lazy(() => import('../pages/auth/Login')) },
          { path: PathConstants.REGISTER, Component: React.lazy(() => import('../pages/auth/Register')) }
        ]
      },
      { path: PathConstants.MAIN, Component: React.lazy(() => import('../pages/Main')) }
    ]
  }
]

export default routes