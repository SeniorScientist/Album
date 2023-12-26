import { IAppContextProviderProps } from '../interfaces/context'

export default function AppContextProviders(props: IAppContextProviderProps) {
  const { components = [], children } = props

  return (
    <>
      {components.reduceRight((acc, Comp) => {
        return <Comp>{acc}</Comp>
      }, children)}
    </>
  )
}