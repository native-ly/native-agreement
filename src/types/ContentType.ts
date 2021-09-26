import React from 'react'

interface RenderContentType {
  renderContent: (read: boolean) => React.ReactNode
}

interface ContentComponentType {
  readonly contentComponent: React.ReactNode
}

interface ContentChildrenType {
  readonly children: React.ReactNode
}

export type ContentType =
  | RenderContentType
  | ContentComponentType
  | ContentChildrenType
