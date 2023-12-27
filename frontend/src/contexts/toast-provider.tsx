import { EToastTypes } from '../types/toast'
import { ToastContainer, toast } from 'react-toastify'
import { ToastContext } from './toast-context'

interface IToastProviderProps {
  children: JSX.Element
}

export function ToastProvider({ children }: IToastProviderProps): JSX.Element {
  function showTypedToast(
    type: EToastTypes,
    message: string = '',
    autoClose = 5000,
    hideProgressBar = false,
    closeOnClick = true,
    pauseOnHover = true,
    draggable = true,
    progress = undefined
  ): void {
    toast[type](message, {
      position: 'top-right',
      autoClose: autoClose,
      hideProgressBar: hideProgressBar,
      closeOnClick: closeOnClick,
      pauseOnHover: pauseOnHover,
      draggable: draggable,
      progress: progress,
    })
  }

  function showToast(
    message: string = '',
    autoClose = 5000,
    hideProgressBar = false,
    closeOnClick = true,
    pauseOnHover = true,
    draggable = true,
    progress = undefined
  ) {
    toast(message, {
      position: 'top-right',
      autoClose: autoClose,
      hideProgressBar: hideProgressBar,
      closeOnClick: closeOnClick,
      pauseOnHover: pauseOnHover,
      draggable: draggable,
      progress: progress,
    })
  }

  function showError(message: string, code?: string) {
    toast.error(!code ? message : `${code} - ${message}`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }
  const value = {
    showError,
    showTypedToast,
    showToast,
  }

  return (
    <ToastContext.Provider value={value}>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {children}
    </ToastContext.Provider>
  )
}