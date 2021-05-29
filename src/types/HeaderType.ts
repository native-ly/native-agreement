import React from 'react'

type RenderHeaderType = {
  renderHeader: (read: boolean) => React.ReactNode
  readonly headerComponent?: React.ReactNode
}

type HeaderComponentType = {
  renderHeader?: (read: boolean) => React.ReactNode
  readonly headerComponent: React.ReactNode
}

// TODO rename
type WithoutHeaderType = {
  renderHeader?: (read: boolean) => React.ReactNode
  readonly headerComponent?: React.ReactNode
}

export type HeaderType =
  | RenderHeaderType
  | HeaderComponentType
  | WithoutHeaderType
