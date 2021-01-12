import React from 'react'

type RenderHeaderType = {
  renderHeader: (read: boolean) => React.ReactNode
  readonly headerComponent: undefined
}

type HeaderComponentType = {
  renderHeader: undefined
  readonly headerComponent: React.ReactNode
}

export type HeaderType = RenderHeaderType | HeaderComponentType
