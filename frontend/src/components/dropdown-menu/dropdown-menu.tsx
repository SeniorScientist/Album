import React, { Fragment } from 'react'
import { cn } from '../../utils/misc'
import { Menu, Transition } from '@headlessui/react'

interface DropdownProps extends React.HTMLAttributes<HTMLElement> {
  dropDownButtonComponent: React.ReactElement
  options: Array<IMenuOption>
}

export interface IMenuOption {
  label: string
  icon?: JSX.Element
  onClick: (e: any | void) => void
}

const DropdownMenu = React.forwardRef<HTMLElement, DropdownProps>(
  ({ className, dropDownButtonComponent, options, ...props }, ref) => {
    const listItems = options.map((option, index) => (
      <Menu.Item key={index} ref={ref} {...props}>
        {({ active }) => (
          <button
            onClick={option.onClick}
            className={cn(
              active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
              'flex w-full px-4 py-2 gap-2 text-sm items-center', className
            )}
          >
            {option.icon}
            {option.label}
          </button>
        )}
      </Menu.Item>
    ))

    return (
      <Menu as='div' className='relative inline-block text-left'>
        <div>{dropDownButtonComponent}</div>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='py-1'>{listItems}</div>
          </Menu.Items>
        </Transition >
      </Menu >
    )
  }
)

DropdownMenu.displayName = 'DropdownMenu'

export default DropdownMenu