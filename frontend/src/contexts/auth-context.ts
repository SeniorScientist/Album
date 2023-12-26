import { createContext, useContext } from "react"

export const AuthContext = createContext({})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useAuth(): any {
  return useContext(AuthContext)
}
