interface LoadingProps {
  size?: number
}

export default function Loading({ size = 35 }: LoadingProps) {
  return (
    <div className='flex w-full h-full items-center justify-center'>
      <div
        style={{ width: `${size}px`, height: `${size}px` }}
        className='animate-spin'>
        <div className='h-full w-full border-4 border-t-black border-b-black rounded-[50%]' />
      </div>
    </div>
  )
}