import React from 'react'
import HeroSection from '../HeroSection/HeroSection';
import QuizCategory from '../QuizCategory/QuizCategory';
import Header from '../Header/Header';
import Footer from '../Footer/Footer'
import { Helmet } from 'react-helmet'
import Carousel from '../Carousel/Carousel'; 

export const Home = () => {
  return (
    <>
      <Helmet>
        <title>Quizzy - Home</title>
      </Helmet>
      <div className='header'>
        <Header />
      </div>
      <div className='hero_section'>
        <HeroSection />
      </div>
      <div className='main_category'>
        <QuizCategory />
      </div>
      <div>
        <Carousel />
      </div>
      <div className='footer'>
        <Footer />
      </div>
      </>
  )
}
