import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import categoryImg from '../assets/landing-page.jpg';
import categoryImg1 from '../assets/hero-section.jpg';
import categoryImg2 from '../assets/logins.jpg';
import categoryImg3 from '../assets/maths.jpg';
import categoryImg4 from '../assets/philosophy.jpg';
import categoryImg5 from '../assets/science.jpg';
import { View, ActivityIndicator, Text, Image } from 'react-native';



export const Category = () => {
  const [quizzes, setQuizzes] = useState([]);
  const { name } = useParams();
  const [loading, setLoading] = useState(true)
  const catImages = [categoryImg, categoryImg1, categoryImg2, categoryImg3, categoryImg4, categoryImg5];

  useEffect(() => {
    const url = `https://quizy.popsicool.tech/api/v1/get_quiz?category=${name}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        setQuizzes(data);
      });
  }, [name]);
 // Shuffle the catImages array
 const shuffledCatImages = [...catImages].sort(() => Math.random() - 0.5);

  return (
    <>
    <View className='container'>

      {loading ?
      <ActivityIndicator/> : <>
      <View style={{color:"red"}}>
          <Text>Welcome to the {name} Quiz Category</Text>
      </View>
      <View ><Text className='text-muted mt-4 text-center'>Select a quiz and get started</Text></View>
        <View>
          {quizzes.map((quiz, index) => (

            <Link to={`/quiz/${quiz.id}`} key={quiz.id} className="card m-2" style={{ width: '20rem' }}>
            <Image source={shuffledCatImages[index % shuffledCatImages.length]} className="card-img-top" alt="..." />
              <View>
                <View >{quiz.title}</View>
                <View >
                   Created on {new Date(quiz.created).toUTCString()}
                </View>

              </View>

            </Link>
          ))}
      </View>
      </>}

      </View>
    </>
  );
};
