import React from 'react'

interface RenderHeaderType {
  renderHeader: (read: boolean) => React.ReactNode
}

interface HeaderComponentType {
  readonly headerComponent: React.ReactNode
}

export type HeaderType = RenderHeaderType | HeaderComponentType | {}
