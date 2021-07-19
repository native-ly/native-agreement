import React from 'react'

interface RenderContent {
  renderContent: (read: boolean) => React.ReactNode
  readonly contentComponent?: React.ReactNode
}

interface ContentComponent {
  renderContent?: (read: boolean) => React.ReactNode
  readonly contentComponent: React.ReactNode
}

export type ContentType = RenderContent | ContentComponent
