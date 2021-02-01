import React from 'react'

type RenderContentType = {
  renderContent: (read: boolean) => React.ReactNode
  readonly contentComponent?: React.ReactNode
}

type ContentComponentType = {
  renderContent?: (read: boolean) => React.ReactNode
  readonly contentComponent: React.ReactNode
}

export type ContentType = RenderContentType | ContentComponentType
