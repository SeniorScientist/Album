import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cn } from '../../utils/misc'

const labelVariants = cva(
  'text-mega text-label peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-sans',
)

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
  VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export default Label
