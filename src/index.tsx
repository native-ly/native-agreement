import React, { useCallback, useEffect, useState } from 'react'
import {
  ViewProps,
  ScrollViewProps,
  View,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native'
import SmartScrollContainer from 'native-smart-scroll-container'

import type { Header } from './types/Header'
import type { Content } from './types/Content'

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
}: NativeScrollEvent) =>
  layoutMeasurement.height + contentOffset.y >= contentSize.height

type HandleScrollCallback = (e: NativeSyntheticEvent<NativeScrollEvent>) => void

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
}: Props & Header & Content) => {
  const [read, setRead] = useState(isRead)

  useEffect(() => {
    setRead(isRead)
  }, [isRead])

  useEffect(() => {
    onReadChange?.(read)
  }, [onReadChange, read])

  const { onScroll, scrollEventThrottle = 16, ...contentRest } = contentProps

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

  return (
    <View {...props}>
      {(renderHeader || headerComponent) && (
        <View {...headerProps}>{renderHeader?.(read) || headerComponent}</View>
      )}

      <SmartScrollContainer
        onScroll={handleScroll}
        scrollEventThrottle={scrollEventThrottle}
        {...contentRest}
      >
        {renderContent?.(read) || contentComponent}
      </SmartScrollContainer>

      {renderFooter && <View {...footerProps}>{renderFooter(read)}</View>}
    </View>
  )
}

export default Agreement
