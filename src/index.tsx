import React, { useState } from 'react'
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
  renderFooter: (read: boolean) => React.ReactNode
  readonly headerProps?: ViewProps
  readonly contentProps?: ScrollViewProps
  readonly footerProps?: ViewProps
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
  ...props
}: Props & HeaderType & ContentType) => {
  const [read, setRead] = useState(false)

  const [wrapperHeight, setWrapperHeight] = useState(0)

  const {
    onScroll,
    onLayout,
    onContentSizeChange,
    ...contentRest
  } = contentProps

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isBottomReached(e.nativeEvent)) {
      setRead(true)
    }

    onScroll?.(e)
  }

  const handleLayout = (e: LayoutChangeEvent) => {
    const { height } = e.nativeEvent.layout

    setWrapperHeight(height)

    onLayout?.(e)
  }

  const handleContentSizeChange = (w: number, h: number) => {
    setRead(h < wrapperHeight)

    onContentSizeChange?.(w, h)
  }

  return (
    <View {...props}>
      {renderHeader && <View {...headerProps}>{renderHeader(read)}</View>}

      <ScrollView
        onLayout={handleLayout}
        onScroll={handleScroll}
        onContentSizeChange={handleContentSizeChange}
        {...contentRest}
      >
        {renderContent?.(read) || contentComponent}
      </ScrollView>

      <View {...footerProps}>{renderFooter(read)}</View>
    </View>
  )
}

export default Agreement
