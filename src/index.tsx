import React, { useState } from 'react'
import {
  ViewProps,
  ScrollViewProps,
  View,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native'

import type { HeaderType } from './types/HeaderType'
import type { ContentType } from './types/ContentType'

interface Props extends ViewProps {
  renderFooter?: (read: boolean) => React.ReactNode
  readonly headerProps?: ViewProps
  readonly contentProps?: ScrollViewProps
  readonly footerProps?: ViewProps
  onRead?: () => void
}

const isBottomReached = ({
  layoutMeasurement,
  contentOffset,
  contentSize,
}: NativeScrollEvent) => {
  return layoutMeasurement.height + contentOffset.y >= contentSize.height
}

const Agreement = ({
  renderHeader,
  renderContent,
  renderFooter,
  headerComponent,
  contentComponent,
  headerProps = {},
  contentProps = {},
  footerProps = {},
  onRead,
  ...props
}: Props & HeaderType & ContentType) => {
  const [read, setRead] = useState(false)

  const { onScroll, ...contentRest } = contentProps

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (!read && isBottomReached(e.nativeEvent)) {
      setRead(true)

      onRead?.()
    }

    onScroll?.(e)
  }

  return (
    <View {...props}>
      {(renderHeader || headerComponent) && (
        <View {...headerProps}>{renderHeader?.(read) || headerComponent}</View>
      )}

      <ScrollView onScroll={handleScroll} {...contentRest}>
        {renderContent?.(read) || contentComponent}
      </ScrollView>

      {renderFooter && <View {...footerProps}>{renderFooter(read)}</View>}
    </View>
  )
}

export default Agreement
