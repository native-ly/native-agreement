import React from 'react'

type RenderContentType = {
  renderContent: (read: boolean) => React.ReactNode
  readonly contentComponent: undefined
}

type ContentComponentType = {
  renderContent: undefined
  readonly contentComponent: React.ReactNode
}

export type ContentType = RenderContentType | ContentComponentType
