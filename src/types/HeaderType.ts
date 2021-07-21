import React from 'react'

interface RenderHeaderType {
  renderHeader: (read: boolean) => React.ReactNode
  readonly headerComponent?: React.ReactNode
}

interface HeaderComponentType {
  renderHeader?: (read: boolean) => React.ReactNode
  readonly headerComponent: React.ReactNode
}

interface NoHeaderType {
  renderHeader?: (read: boolean) => React.ReactNode
  readonly headerComponent?: React.ReactNode
}

export type HeaderType = RenderHeaderType | HeaderComponentType | NoHeaderType
