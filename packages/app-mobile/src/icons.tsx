import { Icon } from '@ui-kitten/components'
import { RenderProp } from '@ui-kitten/components/devsupport'
import React from 'react'
import { ImageProps } from 'react-native'

type IconComponent = RenderProp<Partial<ImageProps>>

export const ChevronLeftIcon: IconComponent = props => (
  <Icon {...props} name='chevron-left' />
)

export const HomeIcon: IconComponent = props => <Icon {...props} name='home' />

export const MenuIcon: IconComponent = props => <Icon {...props} name='menu' />

export const PersonIcon: IconComponent = props => (
  <Icon {...props} name='person' />
)
