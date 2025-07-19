import { redirect } from 'next/navigation'
import { z } from 'zod'

import { COMPANY_TYPES, STATES } from '@/constants'
import { COUNTRIES } from '@/constants/form'

export const step1Schema = z.object({
  businessName: z
    .string()
    .min(3, 'Business name must be at least 3 characters')
    .max(255, 'Business name must be at most 255 characters'),
  companyType: z.enum(COMPANY_TYPES, { message: 'Invalid company type' }),
  adressLine1: z
    .string()
    .min(3, 'Address line 1 must be at least 3 characters')
    .max(255, 'Address line 1 must be at most 255 characters'),
  adressLine2: z.string().optional(),
  city: z
    .string()
    .min(2, 'State must be at least 2 characters')
    .max(100, 'State must be at most 100 characters'),
  state: z.enum(STATES.map(({ abbreviation }) => abbreviation)),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, 'ZIP code must be valid (e.g., 12345 or 12345-6789)'),
})

export const step2Schema = z
  .object({
    firstName: z.string().min(3, 'First name is required'),
    lastName: z.string().min(3, 'Last name is required'),
    email: z.email('Make sure your email is a well formed address'),
    phone: z.string().min(5, 'Phone is required'),
    country: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { phone, country } = data
    if (!country) return
    const countryObj = COUNTRIES.find((c) => c.name === country)
    if (!countryObj || !countryObj.phone_mask) return
    const mask = countryObj.phone_mask
    const regexStr = mask
      .replace(/\(/g, '\\(')
      .replace(/\)/g, '\\)')
      .replace(/ /g, ' ')
      .replace(/-/g, '\\-')
      .replace(/9+/g, (m) => `\\d{${m.length}}`)
    const regex = new RegExp(`^${regexStr}$`)
    if (!regex.test(phone)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['phone'],
        message: `Phone number must match the format: ${mask}`,
      })
    }
  })

export const finalSchema = step1Schema.and(step2Schema)

export const step1Action = async (formData: FormData) => {
  'use server'
  const data = Object.fromEntries(formData.entries())
  const step = Number(data?.step || '1')

  console.log('🫠🫠🫠', data)

  if (step === 1) {
    const result = step1Schema.safeParse(data)
    if (!result.success) {
      const error = encodeURIComponent(
        JSON.stringify(result.error.flatten((issue) => issue.message).fieldErrors),
      )
      const params = new URLSearchParams({
        ...data,
        step: '1',
        error,
      }).toString()
      return redirect(`/?${params}`)
    }
    const params = new URLSearchParams({
      ...data,
      step: '2',
    }).toString()
    return redirect(`/?${params}`)
  }

  if (step === 2) {
    const result = step2Schema.safeParse(data)
    if (!result.success) {
      const error = encodeURIComponent(
        JSON.stringify(result.error.flatten((issue) => issue.message).fieldErrors),
      )
      const params = new URLSearchParams({
        ...data,
        step: '2',
        error,
      }).toString()
      return redirect(`/?${params}`)
    }
    const params = new URLSearchParams({
      ...data,
      step: '3',
    }).toString()
    return redirect(`/?${params}`)
  }

  if (step === 3) {
    const result = finalSchema.safeParse(data)
    if (!result.success) {
      const error = encodeURIComponent(
        JSON.stringify(result.error.flatten((issue) => issue.message).fieldErrors),
      )
      const params = new URLSearchParams({
        ...data,
        step: '3',
        error,
      }).toString()
      return redirect(`/?${params}`)
    }

    let status = 'error'
    let message = ''
    try {
      const response = await fetch('https://ss-company.free.beeceptor.com/company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: data.businessName,
          type: data.type,
          address: {
            line1: data.adressLine1,
            line2: data.adressLine2 || '',
            city: data.city,
            state: data.state,
            zip: data.zip,
          },
          contact: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: (() => {
              const countryName = String(data.country || 'United States')
              const country = COUNTRIES.find((c) => c.name === countryName)
              const ddi = country?.phone_code || '+1'
              const phone = String(data.phone)
              return phone.startsWith('+') ? phone : `${ddi} ${phone}`
            })(),
          },
        }),
      })
      console.log(1, response)
      let responseData: TypeCompanyResponse | null = null
      if (response.ok) {
        responseData = (await response.json()) as TypeCompanyResponse
        status = 'success'
        message = responseData.message
      }
    } catch (e) {
      if (!(e instanceof Error)) return
      status = 'error'
      message = e.message ?? 'Internal server error, try again later'
    }
    const params = new URLSearchParams({
      ...data,
      step: '3',
      type: status,
      message,
    }).toString()
    return redirect(`/?${params}`)
  }
}

export type TypeCompanyResponse = {
  status: string
  message: string
}
