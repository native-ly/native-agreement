import React from 'react'
import { Text } from 'react-native'
import { render } from '@testing-library/react-native'

import NativeAgreement from '../src'

describe('NativeAgreement', () => {
  // scroll to bottom
  it('should', () => {
    const { getByText } = render(
      <NativeAgreement
        renderHeader={() => <Text>Header Text</Text>}
        renderContent={() => <Text>Content Text</Text>}
        renderFooter={() => <Text>Footer Text</Text>}
      />
    )

    expect(getByText('Header Text')).toBeDefined()
    expect(getByText('Content Text')).toBeDefined()
    expect(getByText('Footer Text')).toBeDefined()
  })

  // scroll to bottom
  it('should', () => {
    const { getByText } = render(
      <NativeAgreement
        headerComponent={<Text>Header Text</Text>}
        contentComponent={<Text>Content Text</Text>}
        renderFooter={() => null}
      />
    )

    expect(getByText('Header Text')).toBeDefined()
    expect(getByText('Content Text')).toBeDefined()
  })

  // scroll to bottom
  it('should', () => {
    const { getByText, findByText } = render(
      <NativeAgreement
        headerComponent={<Text>Header Text</Text>}
        renderHeader={() => <Text>Render Header Text</Text>}
        contentComponent={<Text>Content Text</Text>}
        renderContent={() => <Text>Render Content Text</Text>}
        renderFooter={() => null}
      />
    )

    expect(getByText('Render Header Text')).toBeDefined()
    // expect(findByText('Header Text')).not.toBeDefined()
    expect(getByText('Render Content Text')).toBeDefined()
    // expect(findByText('Content Text')).not.toBeDefined()
  })

  // whole text visible
  it('should', () => {
    const { getByText } = render(
      <NativeAgreement
        headerComponent={<Text>Header Text</Text>}
        renderHeader={() => <Text>Render Header Text</Text>}
        contentComponent={<Text>Content Text</Text>}
        renderContent={() => <Text>Render Content Text</Text>}
        renderFooter={() => null}
      />
    )
  })

  // test read change
})
