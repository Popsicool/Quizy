import React, {useState, useEffect} from 'react'
import { View, Text, FlatList, ActivityIndicator, Image, TouchableOpacity} from 'react-native'
import {Card} from "../node_modules/react-bootstrap"
import hero from "../assets/hero.jpg"
import style from "../styles/CategoryStyle"
import categoryImg from '../assets/landing-page.jpg';
import categoryImg1 from '../assets/hero-section.jpg';
import categoryImg2 from '../assets/logins.jpg';
import categoryImg3 from '../assets/maths.jpg';
import categoryImg4 from '../assets/philosophy.jpg';
import categoryImg5 from '../assets/science.jpg';
import { CategoryCard } from './Card'
import { useRouter } from "expo-router";


export const Category = () => {
  const [loading, setisloading] = useState(true)
  const [categories, setCategories] = useState([]);
  const catImages = [categoryImg, categoryImg1, categoryImg2, categoryImg3, categoryImg4, categoryImg5];
  const router = useRouter();
  useEffect(() => {
    const url = "https://quizy.popsicool.tech/api/v1/category";

    fetch(url)
      .then(res => res.json())
      .then(data => {
        setCategories(data);
        setisloading(false)
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
      });
  }, []);
    const handleCardPress = (name) => {
    router.push(`/category/${name}`);
  };

  // Shuffle the catImages array
  const shuffledCatImages = [...catImages].sort(() => Math.random() - 0.5);
  return (
    <View>
      <View
      style={style.categoriesContainer}
      >
        <Text>Popular Quiz Categories</Text>
        <Text>Choose your preferred category and get started</Text>
      </View>
      <View>
        {loading ? <ActivityIndicator size='large' color="red" /> :

        <FlatList
        data= {categories}
        renderItem = {({item, index}) => (
          <TouchableOpacity onPress={() => handleCardPress(item.name)}>
            <CategoryCard
            item = {item}
            img = {shuffledCatImages[index % shuffledCatImages.length]}
            handleCardPress = {handleCardPress}
            />
          </TouchableOpacity>
        )
        }
        contentContainerStyle={{ columnGap: 2 }}
        horizontal
        >
        </FlatList>
}
      </View>
    </View>
  )
}
