import { useMemo } from 'react'
import { EMessageTypes } from '../../types/message'
import React from 'react'
import { cn } from '../../utils/misc'
import { FaExclamationCircle } from 'react-icons/fa'

interface IMessageCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  message: string
  type: EMessageTypes
  visible?: boolean
}

const colorSchemeObj = {
  danger: {
    primary: 'bg-red-100',
    secondary: 'bg-red-300',
    text500: 'text-red-500',
    text700: 'text-red-700',
    text900: 'text-red-900',
  },
  success: {
    primary: 'bg-green-100',
    secondary: 'bg-green-300',
    text500: 'text-green-500',
    text700: 'text-green-700',
    text900: 'text-green-900',
  },
  message: {
    primary: 'bg-blue-100',
    secondary: 'bg-blue-300',
    text500: 'text-blue-500',
    text700: 'text-blue-700',
    text900: 'text-blue-900',
  },
  important: {
    primary: 'bg-yellow-100',
    secondary: 'bg-yellow-300',
    text500: 'text-yellow-500',
    text700: 'text-yellow-700',
    text900: 'text-yellow-900',
  },
}

const MessageCard = React.forwardRef<HTMLDivElement, IMessageCardProps>(
  ({ className, title, message, type, visible = true, ...props }, ref) => {
    const getColor = useMemo(() => {
      return colorSchemeObj[type]
    }, [type])

    if (!visible) return <></>

    return (
      <div ref={ref} className={cn(`space-y-6 ${className || ''}`)} {...props}>
        <div className={`flex gap-4 p-4 rounded-md ${getColor.primary}`}>
          <div className="flex items-center w-max">
            <div className="flex w-10 h-10 align-middle ">
              <span className="m-auto material-icons material-icons-outlined">
                <FaExclamationCircle
                  className={`h-10 w-10 ${getColor.text500} `}
                />
              </span>
            </div>
          </div>
          <div className="flex flex-col justify-center space-y-1 text-sm ">
            <h6 className={`font-medium ${getColor.text900}`}>{title}</h6>
            <p className={`${getColor.text700} leading-tight`}>{message}</p>
          </div>
        </div>
      </div>
    )
  })

MessageCard.displayName = 'MessageCard'

export default MessageCard