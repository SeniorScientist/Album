import { createContext, useContext } from 'react'

export const ToastContext = createContext({})

export function useToast(): any {
  return useContext(ToastContext)
}