import React, { useState } from 'react'
import {
  ViewProps,
  ScrollViewProps,
  View,
  ScrollView,
  NativeScrollEvent,
} from 'react-native'

interface Props extends ViewProps {
  renderHeader?: () => React.ReactNode
  renderContent: () => React.ReactNode
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
  headerProps = {},
  contentProps = {},
  footerProps = {},
  ...props
}: Props) => {
  const [read, setRead] = useState(false)

  const { onScroll, ...contentRest } = contentProps

  return (
    <View {...props}>
      {renderHeader && <View {...headerProps}>{renderHeader()}</View>}

      <ScrollView
        onScroll={(e) => {
          if (isBottomReached(e.nativeEvent)) {
            setRead(true)
          }

          onScroll?.(e)
        }}
        {...contentRest}
      >
        {renderContent()}
      </ScrollView>

      <View {...footerProps}>{renderFooter(read)}</View>
    </View>
  )
}

export default Agreement
