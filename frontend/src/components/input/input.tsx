import React from 'react'

import { cn } from '../../utils/misc'

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-16 w-full rounded-md border-2 border-border bg-input-default outline-none p-[1.125rem] placeholder:text-input-hint text-input font-judson text-label',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export default Input