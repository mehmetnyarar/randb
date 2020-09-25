import { Icon } from '@ui-kitten/components'
import { RenderProp } from '@ui-kitten/components/devsupport'
import React from 'react'
import { ImageProps } from 'react-native'

type IconComponent = RenderProp<Partial<ImageProps>>

export const ChevronLeftIcon: IconComponent = props => (
  <Icon {...props} name='chevron-left' />
)

export const MenuIcon: IconComponent = props => <Icon {...props} name='menu' />
