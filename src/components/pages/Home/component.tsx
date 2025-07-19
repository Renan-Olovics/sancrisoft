import { Button, Icon, Input, Link, Phone, Select } from '@/components/atoms'
import { Stepper, Header } from '@/components/molecules'
import { COMPANY_TYPES, STATES, COUNTRIES } from '@/constants/form'

import { step1Action } from './server'

type Props = {
  params: Record<string, string>
}

export const Home = ({ params }: Props) => {
  const step = Number(params.step || '1')

  const typeMap: Record<number, 'In Progress' | 'success' | 'error' | undefined> = {
    1: undefined,
    2: 'In Progress',
    3: 'In Progress',
  }

  return (
    <main>
      <Header
        name="New Company"
        type={
          params.type === 'success' ? 'success' : params.type === 'error' ? 'error' : typeMap[step]
        }
      />
      <div className="mt-8 flex gap-[27px] pr-6 pl-[34px] sm:gap-[122px] lg:pl-[114px]">
        <Stepper
          params={params}
          currentStep={step}
          steps={['Business structure', 'Contact person', 'Review & submit']}
          disableNavigation={params.type === 'success'}
        />
        <form action={step1Action} method="POST" className="max-w-[502px] p-2.5">
          <input type="hidden" name="step" value={step} />

          <section hidden={step !== 1} className="mb-2.5">
            <Input
              label="Business name"
              name="businessName"
              required={step === 1}
              type="text"
              placeholder="Registered business name"
              maxLength={255}
            />
            <Select
              label="Type"
              name="companyType"
              required={step === 1}
              options={COMPANY_TYPES.map((type) => ({ value: type, label: type }))}
            />
            <Input
              label="Address"
              name="adressLine1"
              required={step === 1}
              type="text"
              placeholder="Address line 1"
              maxLength={255}
            />
            <Input
              name="adressLine2"
              type="text"
              placeholder="Address line 2 (optional)"
              maxLength={255}
            />
            <Input name="city" required={step === 1} type="text" placeholder="City" />
            <div className="flex gap-4">
              <Select
                name="state"
                required={step === 1}
                options={STATES.map(({ abbreviation, name }) => ({
                  value: abbreviation,
                  label: name,
                }))}
                className="flex-1"
                placeholder="State"
              />
              <Input
                name="zip"
                required={step === 1}
                type="text"
                placeholder="Zip"
                className="flex-1"
                maxLength={10}
              />
            </div>
          </section>

          <section hidden={step !== 2} className="mb-[58px]">
            <div className="flex items-end gap-4">
              <Input
                label="Name"
                placeholder="First Name"
                name="firstName"
                required={step === 2}
                type="text"
              />
              <Input placeholder="Last Name" name="lastName" required={step === 2} type="text" />
            </div>
            <Input
              label="Email"
              placeholder="Email"
              name="email"
              required={step === 2}
              type="email"
            />
            <Phone label="Phone" name="phone" />
          </section>

          <section hidden={step !== 3} className="mb-10">
            <h1 className="text-dark mb-8 align-middle text-lg leading-6 font-medium">
              Business structure{' '}
              {params.type !== 'success' && (
                <a
                  href={`?${new URLSearchParams({ ...params, step: '1' }).toString()}`}
                  className="text-primary align-middle text-sm leading-6 font-medium underline decoration-solid"
                >
                  Edit
                </a>
              )}
            </h1>
            <ul className="[&>li]:mb-1 [&>li]:flex [&>li]:items-start">
              <li>
                <span className="text-placeholder block min-w-[110px] text-lg font-medium">
                  Name:
                </span>
                <span className="text-dark ml-2 text-lg font-medium">
                  {params['businessName'] || ''}
                </span>
              </li>
              <li>
                <span className="text-placeholder block min-w-[110px] text-lg font-medium">
                  Type:
                </span>
                <span className="text-dark ml-2 text-lg font-medium">
                  {params['companyType'] || ''}
                </span>
              </li>
              <li>
                <span className="text-placeholder block min-w-[110px] text-lg font-medium">
                  Address:
                </span>
                <span className="text-dark ml-2 text-lg font-medium whitespace-pre-line">
                  {params['adressLine1'] || ''}
                  {params['adressLine2'] ? `\n${params['adressLine2']}` : ''}
                  {params['city'] || params['state'] || params['zip']
                    ? `\n${params['city'] || ''}${params['city'] ? ', ' : ''}${params['state'] || ''} ${params['zip'] || ''}`
                    : ''}
                </span>
              </li>
            </ul>

            <h1 className="text-dark mt-5 mb-8 align-middle text-lg leading-6 font-medium">
              Contact person{' '}
              {params.type !== 'success' && (
                <a
                  href={`?${new URLSearchParams({ ...params, step: '2' }).toString()}`}
                  className="text-primary align-middle text-sm leading-6 font-medium underline decoration-solid"
                >
                  Edit
                </a>
              )}
            </h1>
            <ul className="[&>li]:mb-1 [&>li]:flex [&>li]:items-start">
              <li>
                <span className="text-placeholder block min-w-[110px] text-lg font-medium">
                  Name:
                </span>
                <span className="text-dark ml-2 text-lg font-medium">
                  {params['firstName'] || ''}
                </span>
              </li>
              <li>
                <span className="text-placeholder block min-w-[110px] text-lg font-medium">
                  Email:
                </span>
                <span className="text-dark ml-2 text-lg font-medium">{params['email'] || ''}</span>
              </li>
              <li>
                <span className="text-placeholder block min-w-[110px] text-lg font-medium">
                  Phone:
                </span>
                <span className="text-dark ml-2 text-lg font-medium">
                  {COUNTRIES.find(({ name }) => name === params['country'])?.phone_code || ''}{' '}
                  {params['phone'] || ''}
                </span>
              </li>
            </ul>
          </section>

          {params.type === 'success' && (
            <p className="mb-8 rounded-lg border border-[#008000] bg-[#00800014] px-4 py-3 text-[#008000]">
              {params.message}
            </p>
          )}

          {params.type === 'success' ? (
            <Link fullWidth variant="primary" href="/">
              Start Over <Icon name="Arrow" size={16} />
            </Link>
          ) : (
            <Button fullWidth variant="primary" type="submit" className="gap-[5px]">
              {step === 3 ? 'Confirm & Submit' : 'Continue'} <Icon name="Arrow" size={16} />
            </Button>
          )}

          {params.type === 'error' && (
            <p className="mt-8 rounded-lg border border-[#EF4444] bg-[#EF444414] px-4 py-3 text-[#EF4444]">
              {params.message}
            </p>
          )}
        </form>
      </div>
    </main>
  )
}
