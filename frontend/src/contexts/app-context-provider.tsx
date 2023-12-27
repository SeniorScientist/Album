interface IAppContextProviderProps {
  components: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>
  children: React.ReactNode
}

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