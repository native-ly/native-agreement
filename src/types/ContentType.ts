import React from 'react'

interface RenderContentType {
  renderContent: (read: boolean) => React.ReactNode
  readonly contentComponent?: React.ReactNode
}

interface ContentComponentType {
  renderContent?: (read: boolean) => React.ReactNode
  readonly contentComponent: React.ReactNode
}

export type ContentType = RenderContentType | ContentComponentType
