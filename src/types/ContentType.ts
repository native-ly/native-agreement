import React from 'react'

interface RenderContentType {
  renderContent: (read: boolean) => React.ReactNode
  readonly contentComponent?: React.ReactNode
  readonly children?: React.ReactNode
}

interface ContentComponentType {
  renderContent?: (read: boolean) => React.ReactNode
  readonly contentComponent: React.ReactNode
  readonly children?: React.ReactNode
}

interface ContentChildrenType {
  renderContent?: (read: boolean) => React.ReactNode
  readonly contentComponent?: React.ReactNode
  readonly children: React.ReactNode
}

export type ContentType =
  | RenderContentType
  | ContentComponentType
  | ContentChildrenType
