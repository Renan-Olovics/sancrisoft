import React from 'react'

import { Icon } from '@/components/atoms'

type Props = {
  steps: string[]
  currentStep: number
  params: Record<string, string>
  disableNavigation?: boolean
}

export const Stepper = ({ steps, currentStep, params, disableNavigation = false }: Props) => {
  return (
    <nav className="flex h-fit" aria-label="Progress">
      <ol className="flex flex-col items-center rounded-full bg-[#D9D9D970] px-1 py-2">
        {steps.map((_, idx) => {
          const stepNumber = idx + 1
          const isActive = stepNumber === currentStep
          const isCompleted =
            stepNumber < currentStep || (disableNavigation && stepNumber === steps.length)
          const canGoBack = isCompleted
          const isStepEnabled = !disableNavigation && (canGoBack || isActive)
          return (
            <li key={stepNumber} className="w-full">
              <a
                href={
                  isStepEnabled
                    ? `?${new URLSearchParams({ ...params, step: stepNumber.toString() }).toString()}`
                    : undefined
                }
                className={
                  'flex flex-col items-center ' + (!isStepEnabled ? ' pointer-events-none' : '')
                }
                tabIndex={isStepEnabled ? 0 : -1}
                aria-disabled={!isStepEnabled}
              >
                <div
                  className={
                    'flex h-7 w-7 items-center justify-center rounded-full ' +
                    (isCompleted
                      ? 'bg-[#4ADE80] text-white' // success
                      : isActive
                        ? 'bg-primary text-base font-medium text-white shadow-sm'
                        : 'border border-[#E1E3E6] bg-white text-base font-medium text-black')
                  }
                >
                  {isCompleted ? (
                    <Icon name="Check" size={16} className="text-white" />
                  ) : (
                    stepNumber
                  )}
                </div>
                {idx !== steps.length - 1 && <div className="h-4 w-px bg-transparent" />}
              </a>
            </li>
          )
        })}
      </ol>
      <div className="ml-4 flex flex-col justify-between">
        {steps.map((label) => (
          <div
            key={label}
            className="hidden h-10 items-center sm:flex"
            style={{ minHeight: '28px' }}
          >
            <span className="align-middle text-base leading-6 font-medium text-black">{label}</span>
          </div>
        ))}
      </div>
    </nav>
  )
}
