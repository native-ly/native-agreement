import React from 'react'
import { Text, Button } from 'react-native'
import { render, fireEvent } from '@testing-library/react-native'

import Agreement from '../src'

const content = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed porttitor lacus quis sollicitudin malesuada. Etiam metus ipsum, facilisis et vulputate sit amet, pellentesque a arcu. Praesent sit amet viverra eros, vitae faucibus sapien. In eu nulla diam. Sed consequat mauris ut ultrices bibendum. Vivamus nec velit sem. Ut vestibulum velit eget justo feugiat luctus. Praesent tempor vel justo id euismod. Quisque at scelerisque lorem.

Praesent orci mi, aliquam a hendrerit sit amet, hendrerit vel erat. Duis ligula quam, fermentum et iaculis ut, vestibulum sed diam. Etiam rutrum magna at leo viverra venenatis. Fusce eget aliquet quam. In vestibulum velit neque, nec lacinia massa maximus a. Vivamus quam massa, efficitur vel dictum ac, convallis vel turpis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam blandit consequat lorem eu imperdiet. Morbi nisi magna, accumsan eget consequat ut, egestas ut orci. Vestibulum dignissim accumsan imperdiet. Nulla sed egestas nisi. Maecenas justo nunc, scelerisque in mi ac, convallis aliquet tellus. Sed id risus nibh.

Nullam ipsum tortor, auctor vel consectetur nec, convallis eget diam. Nam quis bibendum felis. Nunc ut nibh a neque egestas condimentum sed id urna. Vestibulum luctus consequat metus, in dapibus nibh aliquet quis. Donec quis eros et diam hendrerit tempor id vitae elit. Nam mollis finibus ligula in euismod. Aenean sed bibendum nulla, rhoncus tincidunt ex.

Duis vulputate enim ut risus rhoncus semper. Morbi mattis enim augue, facilisis auctor tortor malesuada sit amet. Nullam congue vitae sem ut convallis. Pellentesque efficitur turpis eget maximus tempus. Pellentesque posuere placerat rhoncus. Fusce facilisis ligula non ante finibus posuere. Duis sit amet dapibus mi. Cras sit amet velit urna. Praesent congue, est sit amet dictum viverra, ipsum nisi condimentum velit, a gravida est ante posuere felis. Suspendisse consectetur ut tellus ut ultrices. Sed eget varius felis. Sed ligula dui, dictum et facilisis dictum, dictum a nibh.

Mauris sit amet nibh at lacus bibendum euismod. Aenean eget vulputate dui. Cras pulvinar arcu quis eros ornare, in fringilla mauris ultrices. Vivamus id pulvinar risus. Donec lacus purus, tempus id pulvinar sit amet, porttitor vel ipsum. In ut dictum risus. Duis at odio pellentesque, cursus justo sed, ornare justo. In varius quam in enim semper sodales.
`

describe('Agreement', () => {
  const eventData = {
    nativeEvent: {
      contentOffset: {
        y: 200,
      },
    },
  }

  it.skip('should enable Agree button after scroll content to bottom', () => {
    const onPress = jest.fn()

    // TODO update
    const { getByText, getByTestId, queryByText } = render(
      <Agreement
        // contentProps={{
        //   style: {
        //     height: 500,
        //   },
        // }}
        renderContent={() => <Text>{content}</Text>}
        renderFooter={(read) => (
          <Button title="Agree" disabled={!read} onPress={onPress} />
        )}
      />
    )

    fireEvent.press(getByText('Agree'))

    // fireEvent.scroll(queryByText('Lorem ipsum dolor'), eventData)
    fireEvent.scroll(getByTestId('scroll-view'), eventData)

    fireEvent.press(getByText('Agree'))

    expect(onPress).toHaveBeenCalledTimes(1)
  })
})
