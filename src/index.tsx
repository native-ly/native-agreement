import React, { useRef, useState } from 'react'
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

  const { onScroll, ...contentRest } = contentProps

  // const ref = useRef<ScrollView>(null)

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isBottomReached(e.nativeEvent)) {
      setRead(true)
    }

    onScroll?.(e)
  }

  // const handleContentSizeChange = (_: number, h: number) => {
  // console.log(ref.current)

  // setRead(h < ref?.current)s
  // }

  return (
    <View {...props}>
      {renderHeader && <View {...headerProps}>{renderHeader(read)}</View>}
      {/* {renderHeader && <View {...headerProps}>{renderHeader()}</View>} */}

      <ScrollView
        // testID="scroll-view"
        // ref={ref}
        onScroll={handleScroll}
        // onContentSizeChange={handleContentSizeChange}
        {...contentRest}
      >
        {renderContent?.(read) || contentComponent}
      </ScrollView>

      <View {...footerProps}>{renderFooter(read)}</View>
    </View>
  )
}

export default Agreement
