'use client'

import type { ComponentProps } from 'react'
import { useRef, useEffect } from 'react'

import { useSearchParams } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

import { Icon } from '@/components/atoms'

export type SelectOption = { value: string; label: string }

export type SelectProps = ComponentProps<'select'> & {
  label?: string
  error?: string[]
  variant?: 'primary'
  options: SelectOption[]
  placeholder?: string
  autoFocusError?: boolean
}

const selectVariants = tv({
  base: '',
  variants: {
    variant: {
      primary:
        'text-placeholder block w-full px-4 py-[5px] border-border border-[1px] rounded-lg focus:outline-none transition-colors text-sm bg-white placeholder-placeholder',
    },
  },
  defaultVariants: {
    variant: 'primary',
    error: false,
  },
})

export const Select = ({
  label,
  error,
  name,
  variant = 'primary',
  className,
  options,
  placeholder,
  autoFocusError = false,
  ...props
}: SelectProps) => {
  const searchParams = useSearchParams()
  const defaultValue = name ? searchParams?.get(name) || '' : ''
  const hasError = !!(error && error.length > 0)
  const selectRef = useRef<HTMLSelectElement>(null)

  useEffect(() => {
    if (hasError && autoFocusError && selectRef.current) {
      selectRef.current.focus()
    }
  }, [hasError, autoFocusError])

  return (
    <div className="mb-6">
      {label && (
        <label htmlFor={name} className="text-dark mb-4 block text-lg leading-6 font-medium">
          {label}
        </label>
      )}
      <select
        ref={selectRef}
        id={name}
        name={name}
        defaultValue={defaultValue}
        className={twMerge(selectVariants({ variant }), className)}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${name}-error` : undefined}
        {...props}
      >
        <option value="" disabled>
          {placeholder ?? 'Select an option'}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {hasError && (
        <p
          id={`${name}-error`}
          className="font-dmSans text-error-text mt-4 flex items-center gap-[2px] text-sm leading-5 font-normal"
          role="alert"
        >
          <Icon name="Warning" size={20} /> {error[0]}
        </p>
      )}
    </div>
  )
}
