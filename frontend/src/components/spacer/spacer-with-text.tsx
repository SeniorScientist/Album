import React from 'react'
import { cn } from '../../utils/misc'

interface ISpacerWithTextProps
  extends React.HTMLAttributes<HTMLDivElement> {
  text: string
}

const SpacerWithText = React.forwardRef<HTMLDivElement, ISpacerWithTextProps>(
  ({ className, text, ...props }, ref) => (
    <div ref={ref} className={cn(className)} {...props}>
      <div className="flex justify-center w-full ">
        <div className="flex flex-grow mx-2 mb-2 border-b-2 border-gray-300 " />
        {text}
        <div className="flex flex-grow mx-2 mb-2 border-b-2 border-gray-300 " />
      </div>
    </div>
  )
)

SpacerWithText.displayName = 'SpacerWithText'

export default SpacerWithText