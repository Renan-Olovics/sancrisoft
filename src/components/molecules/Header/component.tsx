import { Tag } from '@/components/atoms'

type Props = {
  name: string
  type?: 'In Progress' | 'success' | 'error'
}

export const Header = ({ name = 'page name', type }: Props) => {
  return (
    <header className="flex h-[110px] items-center border-b border-[#ECEEEB]">
      <h1 className="mt-4 flex gap-9 pl-[34px] text-base font-medium sm:pl-[114px]">
        {name} {type && <Tag type={type} />}
      </h1>
    </header>
  )
}
