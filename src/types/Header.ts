import React from 'react'

type RenderHeader = {
  renderHeader: (read: boolean) => React.ReactNode
  readonly headerComponent?: React.ReactNode
}

type HeaderComponent = {
  renderHeader?: (read: boolean) => React.ReactNode
  readonly headerComponent: React.ReactNode
}

type HeaderLess = {
  renderHeader?: (read: boolean) => React.ReactNode
  readonly headerComponent?: React.ReactNode
}

export type Header = RenderHeader | HeaderComponent | HeaderLess
