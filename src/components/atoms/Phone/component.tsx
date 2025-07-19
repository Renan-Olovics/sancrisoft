'use client'

import React, { useState } from 'react'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation'

import { COUNTRIES } from '@/constants'

export type PhoneProps = {
  name: string
  countryName?: string
  label?: string
  className?: string
  type?: string
}

const PLACEHOLDERS: Record<string, string> = {
  '+1': '(555) 000-0000',
  '+44': '07123 456789',
  '+61': '0412 345 678',
  '+49': '01512 3456789',
  '+33': '06 12 34 56 78',
  '+81': '090-1234-5678',
  '+86': '138 0013 8000',
  '+91': '09876 543210',
  '+55': '(11) 91234-5678',
}

export const Phone = ({
  name,
  countryName = 'country',
  label,
  className,
  type = 'tel',
}: PhoneProps) => {
  const searchParams = useSearchParams()
  const phone = searchParams.get(name) || ''
  const country = searchParams.get(countryName) || COUNTRIES[0].name

  let errorMsg: string | undefined = undefined
  const errorParam = searchParams.get('error')
  if (errorParam && name) {
    try {
      const errorObj = JSON.parse(decodeURIComponent(errorParam))
      errorMsg = errorObj[name]
    } catch {}
  }

  const hasError = !!errorMsg

  const [selectedCountry, setSelectedCountry] = useState(country)
  const [phoneValue, setPhoneValue] = useState(phone)

  const selectedCountryObj = COUNTRIES.find(({ name }) => name === selectedCountry) ?? COUNTRIES[0]
  const phoneCode = selectedCountryObj.phone_code

  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="text-dark mb-4 block text-lg leading-6 font-medium">
          {label}
        </label>
      )}
      <div className="border-border flex h-[34px] w-full items-center gap-2 rounded-lg border bg-white px-2">
        <Image
          src={selectedCountryObj.flag_url}
          alt={name}
          width={24}
          height={16}
          className="h-4 w-6 rounded-sm"
        />
        <select
          name={countryName}
          className="h-10 rounded bg-transparent pr-2 text-base text-gray-700 outline-none"
          aria-label="Country code"
          value={selectedCountry}
          onChange={(e) => {
            setSelectedCountry(e.target.value)
            setPhoneValue('')
          }}
        >
          {COUNTRIES.map(({ name, phone_code }) => (
            <option key={name} value={name}>
              {phone_code}
            </option>
          ))}
        </select>
        <input
          id={name}
          name={name}
          type={type}
          value={phoneValue}
          onChange={(e) => setPhoneValue(e.target.value)}
          className="flex-1 border-0 bg-transparent text-base text-gray-700 outline-none"
          placeholder={PLACEHOLDERS[phoneCode] || ''}
        />
      </div>
      {hasError && (
        <p
          className="font-dmSans text-error-text mt-4 flex items-center gap-[2px] text-sm leading-5 font-normal"
          role="alert"
        >
          {errorMsg}
        </p>
      )}
    </div>
  )
}
