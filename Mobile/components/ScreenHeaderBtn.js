import React from 'react'
import { TouchableOpacity, Image, Text } from 'react-native'
import styles from "../styles/HeaderStyle"


export const ScreenHeaderBtn = ({iconUrl, handlePress, content}) => {
  return (
    <>
    <TouchableOpacity style={styles.btnContainer} onPress={handlePress}>
        <Image
        source = {iconUrl}
        resizeMethod='cover'
        style={styles.btnImg()}
        />
    </TouchableOpacity>
    {content && <Text>{content}</Text>}
    </>
  )
}
