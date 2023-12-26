export interface IAuthProviderProps {
  children: JSX.Element
}

export interface IAppContextProviderProps {
  components: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>
  children: React.ReactNode
}