import React, { useCallback, useEffect, useState, useMemo } from 'react'
import {
  ViewProps,
  ScrollViewProps,
  View,
  NativeScrollEvent,
} from 'react-native'
import SmartScrollContainer from 'native-smart-scroll-container'

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

type HandleScrollCallback = NonNullable<ScrollViewProps['onScroll']>

const isBottomReached = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}: NativeScrollEvent) =>
  layoutMeasurement.height + contentOffset.y >= contentSize.height

const Agreement = ({
  renderFooter,
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

  const header = useMemo(() => {
    if ('renderHeader' in props) {
      return props.renderHeader?.(read)
    }

    if ('headerComponent' in props) {
      return props.headerComponent
    }
  }, [props, read])

  const content = useMemo(() => {
    if ('children' in props) {
      return props.children
    }

    if ('renderContent' in props) {
      return props.renderContent?.(read)
    }

    return props.contentComponent
  }, [props, read])

  return (
    <View {...props}>
      {header && <View {...headerProps}>{header}</View>}

      <SmartScrollContainer
        onScroll={handleScroll}
        scrollEventThrottle={scrollEventThrottle}
        {...contentRest}
      >
        {content}
      </SmartScrollContainer>

      {renderFooter && <View {...footerProps}>{renderFooter(read)}</View>}
    </View>
  )
}

export default Agreement
