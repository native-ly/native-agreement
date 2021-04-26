# [native-agreement](https://github.com/native-ly/native-agreement)

[![NPM version](https://img.shields.io/npm/v/native-agreement?style=flat-square)](https://www.npmjs.com/package/native-agreement)
[![NPM downloads](https://img.shields.io/npm/dm/native-agreement?style=flat-square)](https://www.npmjs.com/package/native-agreement)
[![NPM license](https://img.shields.io/npm/l/native-agreement?style=flat-square)](https://www.npmjs.com/package/native-agreement)
[![run in expo snack](https://img.shields.io/badge/Run%20in%20Snack-4630EB?style=flat-square&logo=EXPO&labelColor=FFF&logoColor=000)](https://snack.expo.io/@jbiesiada/native-agreement)
[![Codecov](https://img.shields.io/codecov/c/github/native-ly/native-agreement?style=flat-square)](https://codecov.io/gh/native-ly/native-agreement)
[![Travis](https://img.shields.io/travis/com/native-ly/native-agreement/master?style=flat-square)](https://travis-ci.com/native-ly/native-agreement)

## About

React Native component that allows display different footer based on scroll position of content section e.g.: if you want to display agreement you will be able to render different button or disable it until user read (scroll to bottom) section with the contract.

## How to Install

First, install the library in your project by npm:

```sh
$ npm install native-agreement
```

Or Yarn:

```sh
$ yarn add native-agreement
```

## Options

Props extends ViewProps

| Name             | Type                               | Description                                            |
| ---------------- | ---------------------------------- | ------------------------------------------------------ |
| renderHeader     | (read: boolean) => React.ReactNode | Function to render component inside the header         |
| renderContent    | (read: boolean) => React.ReactNode | Function to render component inside the scroll section |
| renderFooter     | (read: boolean) => React.ReactNode | Function to render component inside the footer         |
| headerComponent  | React.ReactNode                    | Component to be rendered inside the header             |
| contentComponent | React.ReactNode                    | Component to be rendered inside the scroll section     |
| headerProps      | ViewProps                          | Props for the header                                   |
| contentProps     | ScrollViewProps                    | Props for the scroll section                           |
| footerProps      | ViewProps                          | Props for the footer                                   |
| onRead           | () => void                         | Callback on agreement read                             |
| onReadChange     | (read: boolean) => void            | Callback on read value change                          |
| isRead           | boolean                            | Set and reset read value from outside the component    |

## Example

```js
import React, { useState } from 'react'
import { View, Text } from 'react-native'
import NativeAgreement from 'native-agreement'

const App = () => {
  const [agreed, setAgreed] = useState(false)

  const headerRenderer = () => (
    <View>
      <Text>Agreement</Text>
    </View>
  )

  return (
    <NativeAgreement
      renderHeader={headerRenderer}
      contentComponent={<Text>Very long text here...</Text>}
      renderFooter={(read) => (
        <Button onPress={() => setAgreed(true)} disabled={!read}>
          Agree
        </Button>
      )}
    />
  )
}
```

## License

This project is licensed under the MIT License © 2020-present Jakub Biesiada
