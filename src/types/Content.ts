import React from 'react'

type RenderContent = {
  renderContent: (read: boolean) => React.ReactNode
  readonly contentComponent?: React.ReactNode
}

type ContentComponent = {
  renderContent?: (read: boolean) => React.ReactNode
  readonly contentComponent: React.ReactNode
}

export type Content = RenderContent | ContentComponent
