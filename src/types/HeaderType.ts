import React from 'react'

type RenderHeaderType = {
  renderHeader: (read: boolean) => React.ReactNode
  readonly headerComponent?: React.ReactNode
}

type HeaderComponentType = {
  renderHeader?: (read: boolean) => React.ReactNode
  readonly headerComponent: React.ReactNode
}

type NoHeaderType = {
  renderHeader?: (read: boolean) => React.ReactNode
  readonly headerComponent?: React.ReactNode
}

export type HeaderType = RenderHeaderType | HeaderComponentType | NoHeaderType
