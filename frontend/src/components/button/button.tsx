import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '../../utils/misc'

const buttonVariants = cva(
  'inline-flex items-center justify-center text-button w-full overflow-hidden text-button-text outline-none font-inter transition-all disabled:cursor-default',
  {
    variants: {
      variant: {
        default: 'before:ease relative bg-button-default before:absolute before:right-0 before:top-0 before:h-full before:w-12 before:translate-x-12 before:bg-white before:opacity-10 before:duration-700 hover:shadow-black-500 hover:before:-translate-x-96 active:opacity-85 disabled:opacity-25',
        icon: ''
      },
      size: {
        default: 'rounded-lg h-16',
        icon: 'rounded-sm h-fit px-9 py-2'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

interface ButtonProps
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