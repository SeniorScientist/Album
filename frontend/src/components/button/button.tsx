import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../utils/misc'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-lg text-button w-full h-16 before:ease relative overflow-hidden bg-button-default text-button-text outline-none font-inter transition-all before:absolute before:right-0 before:top-0 before:h-full before:w-12 before:translate-x-12 before:bg-white before:opacity-10 before:duration-700 hover:shadow-black-500 hover:before:-translate-x-72 active:opacity-85 disabled:opacity-25 disabled:cursor-default',
  {
    variants: {
      variant: {
        default: '',

      },
      size: {
        default: ''
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export default Button