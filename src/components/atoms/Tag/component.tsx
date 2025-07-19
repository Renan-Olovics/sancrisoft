import { twMerge } from 'tailwind-merge'
import { tv } from 'tailwind-variants'

type Props = {
  type?: 'In Progress' | 'success' | 'error'
}

const tagVariants = tv({
  base: 'inline-flex items-center px-2 py-0.5 rounded text-xs font-normal bg-[#80808014]',
  variants: {
    type: {
      'In Progress': 'text-[#FFA500]',
      success: ' text-[#008000]',
      error: ' text-[#FF0000]',
    },
  },
  defaultVariants: {
    type: 'In Progress',
  },
})

export const Tag = ({ type = 'In Progress' }: Props) => {
  return <span className={twMerge(tagVariants({ type }))}>{type}</span>
}
