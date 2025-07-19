import type { ComponentProps } from 'react'

import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

export type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary' | 'danger'
  fullWidth?: boolean
}

const buttonVariants = tv({
  base: 'py-[5px] items-center  inline-flex justify-center font-medium rounded-[6px] transition-colors focus:outline-none',
  variants: {
    variant: {
      primary: 'bg-primary text-white',
      secondary: 'bg-gray-200 text-gray-900',
      danger: 'bg-red-600 text-white',
    },
    fullWidth: {
      true: 'w-full',
      false: '',
    },
    disabled: {
      true: 'opacity-50',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'primary',
      disabled: false,
      class: 'hover:bg-blue-700',
    },
    {
      variant: 'secondary',
      disabled: false,
      class: 'hover:bg-gray-300',
    },
    {
      variant: 'danger',
      disabled: false,
      class: 'hover:bg-red-700',
    },
  ],
  defaultVariants: {
    variant: 'primary',
    fullWidth: false,
    disabled: false,
  },
})

export const Button = ({
  variant = 'primary',
  fullWidth = false,
  disabled = false,
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={twMerge(buttonVariants({ variant, fullWidth, disabled }), className)}
      {...props}
    >
      {children}
    </button>
  )
}
