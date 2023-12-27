import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import routes from '../routes'
import AuthProvider from '../contexts/auth-provider'
import AppContextProviders from '../contexts/app-context-provider'
import { ToastProvider } from '../contexts/toast-provider'

export default function App() {
  const router = createBrowserRouter(routes)

  const providers = [AuthProvider, ToastProvider]

  return (
    <AppContextProviders components={providers}>
      <RouterProvider router={router} />
    </AppContextProviders>
  )
}
