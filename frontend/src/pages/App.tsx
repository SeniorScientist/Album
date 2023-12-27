import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import routes from '../routes'
import Layout from '../layouts/Layout'
import Page404 from './auth/Page404'
import AuthProvider from '../contexts/auth-provider'
import AppContextProviders from '../contexts/app-context-provider'
import { ToastProvider } from '../contexts/toast-provider'


function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <Page404 />,
      // specify the routes defined in the
      // routing layer directly
      children: routes
    }
  ])

  const providers = [AuthProvider, ToastProvider]

  return (
    <AppContextProviders components={providers}>
      <RouterProvider router={router} />
    </AppContextProviders>

  )
}

export default App
