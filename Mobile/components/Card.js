import React from 'react'
import { Card } from 'react-bootstrap'
import { View, Text, Image } from 'react-native'
import hero from "../assets/hero.jpg"
import style from "../styles/CatStyle"

export const CategoryCard = (item) => {

  return (
    <View style={style.Cardbody}>
            <Image
            source = {item.img}
            style = {style.ImageStyle}
            />
            <Text>{item.item.name}</Text>
            <Text
            numberOfLines={1}
            >
                Test your knowledge of {item.item.name}</Text>
    </View>
  )
}
