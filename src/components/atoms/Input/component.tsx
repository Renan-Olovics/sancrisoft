'use client'

import type { ComponentProps } from 'react'

import { useSearchParams } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import { Icon } from '@/components/atoms'

export type InputProps = ComponentProps<'input'> & {
  label?: string
  variant?: 'primary'
}

const inputVariants = tv({
  base: '',
  variants: {
    variant: {
      primary:
        'block w-full px-4 py-[5px] border-border border-[1px] rounded-lg focus:outline-none transition-colors text-sm bg-white placeholder-placeholder',
    },
    error: {
      true: 'border-error-border focus:border-error-border border-[1px]',
    },
  },
  defaultVariants: {
    variant: 'primary',
    error: false,
  },
})

export const Input = ({ label, name, variant = 'primary', className, ...props }: InputProps) => {
  const searchParams = useSearchParams()
  const paramValue = name ? searchParams?.get(name) : ''
  const defaultValue = paramValue ?? ''
  let errorMsg: string | undefined = undefined

  if (searchParams && searchParams.get('error') && name) {
    try {
      const errorObj = JSON.parse(decodeURIComponent(searchParams.get('error')!))
      errorMsg = errorObj[name]
    } catch {}
  }

  const hasError = !!errorMsg

  return (
    <div className="mb-6">
      {label && (
        <label htmlFor={name} className="text-dark mb-4 block text-lg leading-6 font-medium">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        defaultValue={defaultValue}
        className={twMerge(inputVariants({ variant, error: hasError }), className)}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${name}-error` : undefined}
        {...props}
      />
      {hasError && (
        <p
          id={`${name}-error`}
          className="font-dmSans text-error-text mt-4 flex items-center gap-[2px] text-sm leading-5 font-normal"
          role="alert"
        >
          <Icon name="Warning" size={20} /> {errorMsg}
        </p>
      )}
    </div>
  )
}
