import React, { useCallback, useEffect, useState } from 'react'
import {
  ViewProps,
  ScrollViewProps,
  View,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  LayoutChangeEvent,
} from 'react-native'

import type { HeaderType } from './types/HeaderType'
import type { ContentType } from './types/ContentType'

interface Props extends ViewProps {
  renderFooter?: (read: boolean) => React.ReactNode
  readonly headerProps?: ViewProps
  readonly contentProps?: ScrollViewProps
  readonly footerProps?: ViewProps
  readonly isRead?: boolean
  onReadChange?: (read: boolean) => void
  onRead?: () => void
}

const isBottomReached = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}: NativeScrollEvent) => {
  return layoutMeasurement.height + contentOffset.y >= contentSize.height
}

type HandleScrollCallback = (e: NativeSyntheticEvent<NativeScrollEvent>) => void
type HandleLayoutCallback = (e: LayoutChangeEvent) => void
type HandleContentSizeChangeCallback = (w: number, h: number) => void

const Agreement = ({
  renderHeader,
  renderContent,
  renderFooter,
  headerComponent,
  contentComponent,
  headerProps = {},
  contentProps = {},
  footerProps = {},
  isRead = false,
  onReadChange,
  onRead,
  ...props
}: Props & HeaderType & ContentType) => {
  const [read, setRead] = useState(isRead)

  useEffect(() => {
    setRead(isRead)
  }, [isRead])

  useEffect(() => {
    onReadChange?.(read)
  }, [onReadChange, read])

  const [wrapperHeight, setWrapperHeight] = useState(0)

  const {
    onScroll,
    onLayout,
    onContentSizeChange,
    ...contentRest
  } = contentProps

  const handleScroll = useCallback<HandleScrollCallback>(
    (e) => {
      if (!read && isBottomReached(e.nativeEvent)) {
        setRead(true)

        onRead?.()
      }

      onScroll?.(e)
    },
    [onRead, onScroll, read]
  )

  const handleLayout = useCallback<HandleLayoutCallback>(
    (e) => {
      const { height } = e.nativeEvent.layout

      setWrapperHeight(height)

      onLayout?.(e)
    },
    [onLayout]
  )

  const handleContentSizeChange = useCallback<HandleContentSizeChangeCallback>(
    (w, h) => {
      setRead(h < wrapperHeight)

      onContentSizeChange?.(w, h)
    },
    [onContentSizeChange, wrapperHeight]
  )

  return (
    <View {...props}>
      {(renderHeader || headerComponent) && (
        <View {...headerProps}>{renderHeader?.(read) || headerComponent}</View>
      )}

      <ScrollView
        onLayout={handleLayout}
        onScroll={handleScroll}
        onContentSizeChange={handleContentSizeChange}
        {...contentRest}
      >
        {renderContent?.(read) || contentComponent}
      </ScrollView>

      {renderFooter && <View {...footerProps}>{renderFooter(read)}</View>}
    </View>
  )
}

export default Agreement
