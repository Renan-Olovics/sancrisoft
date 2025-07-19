import React from 'react'

import * as Icons from '@/assets'

import type { IconProps } from './types'

export const Icon = ({ name, size = 50, width, height, className, ...props }: IconProps) => {
  const IconComponent = Icons[name]
  if (!IconComponent) return null

  return (
    <IconComponent width={width ?? size} height={height ?? size} className={className} {...props} />
  )
}
