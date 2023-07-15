import React from 'react'
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native'
import style from "../styles/HeroStyle"
import heroImg from "../assets/hero.jpg"

export const Hero = () => {
  return (
    <View
    style={style.heroSection}
    >
      <View
      style={style.heroContent}>
        <ImageBackground
        source={heroImg}
        >
          <Text
          style={style.heroContentH1}
          >
              Welcome to Quizy App
          </Text>
          <Text
          style={style.heroContentP}
          >
            Have Fun with interesting Quizzes
          </Text>
          <TouchableOpacity className="btn btn-primary btn-lg">
            <Text >
              Get Started
            </Text>
          </TouchableOpacity>

        </ImageBackground>
      </View>
    </View>
  )
}
