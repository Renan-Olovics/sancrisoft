import type { ComponentProps } from 'react'

import type * as Icons from '@/assets'

export type IconNames = keyof typeof Icons

export type IconProps = React.SVGProps<SVGSVGElement> & {
  name: IconNames
  size?: number
  width?: number
  height?: number
}
